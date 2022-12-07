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

  return res.status(401).json({ message: "Wrong email/password" });
};

export default ensureUserExistsMiddleware;
