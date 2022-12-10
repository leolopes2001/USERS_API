import { compare } from "bcryptjs";
import users from "../database";
import { AppError } from "../errors";

const ensurePasswordMatchesMiddleware = async (req, res, next) => {
  const { password } = req.user

  const passwordMatch = await compare(req.body.password, password);

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  return next();
};

export default ensurePasswordMatchesMiddleware;
