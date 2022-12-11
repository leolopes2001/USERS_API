import { database } from "../database";
import { AppError } from "../errors";

const ensureUserNotExistsMiddleware = async (req, res, next) => {
  const searchUser = await database.query(
    `SELECT email FROM users WHERE email = $1;`,
    [req.body.email]
  );

  if (searchUser.rowCount > 0)
    throw new AppError("E-mail already registered", 409);

  return next();
};

export default ensureUserNotExistsMiddleware;
