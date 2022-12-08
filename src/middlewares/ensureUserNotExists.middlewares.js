import { database } from "../database";

const ensureUserNotExistsMiddleware = async (req, res, next) => {
  const foundUser = await database
    .query(`SELECT email FROM users WHERE email = $1;`, [req.body.email])
    .then((res) => res.rows[0]);

  if (!foundUser) return next();

  return res.status(409).json({ message: "E-mail already registered" });
};

export default ensureUserNotExistsMiddleware;
