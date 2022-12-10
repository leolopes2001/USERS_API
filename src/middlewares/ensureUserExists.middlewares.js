import users from "../database";
import { AppError } from "../errors";

import { database } from "../database";

const ensureUserExistsMiddleware = async (req, res, next) => {
  const user = await database
    .query(
      `
      SELECT 
      	*
      FROM 
      	users 
      WHERE 
      	email = $1;
      `,
      [req.body.email]
    )
    .then((res) => res.rows[0]);

  if (user) {
    req.user = { ...user };
    return next();
  }

  if (userIndex === undefined) {
    throw new AppError("Wrong email/password", 401);
  }
  req.userIndex = userIndex;

  return next();
};

export default ensureUserExistsMiddleware;
