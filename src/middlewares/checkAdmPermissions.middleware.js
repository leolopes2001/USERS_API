const checkAdmPermissionsMiddleware = (req, res, next) => {
  const idUserTarget = req.params.id;
  const idUserSession = req.user.id;

  if (idUserTarget === idUserSession) return next();
  if (idUserTarget !== idUserSession && req.user.isAdm) return next();

  return res.status(403).json({ message: "missing admin permissions" });
};

export default checkAdmPermissionsMiddleware;
