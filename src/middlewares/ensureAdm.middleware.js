import users from "../database";

const ensureAdmMiddleware = (req, res, next) => {
  const user = users.find((user) => user.uuid === req.user.uuid);

  if (user.isAdm) return next();

  return res.status(403).json({ message: "missing admin permissions" });
};

export default ensureAdmMiddleware;
