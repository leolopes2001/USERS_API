import { database } from "../database";

const ensureAdmMiddleware = async (req, res, next) => {
  const user = await database
    .query(
      `SELECT 
        * 
    FROM 
        users 
    WHERE 
        id = $1;`,
      [req.user.id]
    )
    .then((res) => res.rows[0]);

  if (user.isAdm) return next();

  return res.status(403).json({ message: "missing admin permissions" });
};

export default ensureAdmMiddleware;
