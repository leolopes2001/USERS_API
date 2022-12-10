import users from "../database";

const ensureAdmMiddleware = (req, res, next) => {
  console.log(req.user.uuid);
  const user = users.find((user) => user.uuid === req.user.uuid);

  if (!user) {
    return res.status(403).json({ message: "missing admin permissions" });
  }

  if (!user.isAdm) {
    return res.status(403).json({ message: "missing admin permissions" });
  }
  
  if (user.isAdm) return next();
};

export default ensureAdmMiddleware;
