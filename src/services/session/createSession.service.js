import { compare, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { database } from "../../database";
import { AppError } from "../../errors";

const createSessionService = async ({ email, password }) => {
  const user = await database
    .query(
      `
      SELECT id,email,"password" FROM users WHERE email = $1;
    `,
      [email]
    )
    .then((res) => res.rows[0]);

  if (!user) throw new AppError("Wrong email or password", 401);

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) throw new AppError("Wrong email or password", 401);

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  });

  return { token };
};

export default createSessionService;
