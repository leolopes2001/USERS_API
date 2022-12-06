import users from "../database";

const ensureUserNotExistsMiddleware = (req, res, next) => {
  const foundUser = users.find((user) => user.email === req.body.email);

  if (!foundUser) return next();

  return res.status(409).json({ message: "E-mail already registered" });
};

export default ensureUserNotExistsMiddleware;
