import { compare } from "bcryptjs";
import users from "../database";

const ensurePasswordMatchesMiddleware = async (req, res, next) => {
  const { password } = req.user

  const passwordMatch = await compare(req.body.password, password);

  if (passwordMatch) return next();

  return res.status(401).json({ message: "Wrong email/password" });
};

export default ensurePasswordMatchesMiddleware;
