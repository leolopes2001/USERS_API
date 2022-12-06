import users from "../database";

const ensureUserExistsMiddleware = (req, res, next) => {
  const userIndex = users.findIndex((user) => user.email === req.body.email);
  req.userIndex = userIndex;

  if (userIndex !== -1) return next();

  return res.status(401).json({ message: "Wrong email/password" });
};

export default ensureUserExistsMiddleware;
