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



  if (!user) {
    return res.status(403).json({ message: "missing admin permissions" });
  }

  if (!user.isAdm) {
    return res.status(403).json({ message: "missing admin permissions" });
  }
  
  if (user.isAdm) return next();
};

export default ensureAdmMiddleware;
