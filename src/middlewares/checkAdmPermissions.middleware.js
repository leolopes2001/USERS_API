import users from "../database";

const checkAdmPermissionsMiddleware = (req, res, next) => {
  const idUserTarget = req.params.id;
  const idUserSession = req.user.uuid;
  const userSession = users.find((user) => user.uuid === idUserSession);

  if (idUserTarget === idUserSession) return next();
  if (idUserTarget !== idUserSession && userSession.isAdm) return next();

  return res.status(403).json({ message: "missing admin permissions" });
};

export default checkAdmPermissionsMiddleware;

