import users from "../database";
import { AppError } from "../errors";

const ensureUserExistsMiddleware = (req, res, next) => {
  try {
    const userIndex = users.findIndex((user) => user.email === req.body.email);

    if (userIndex === -1) {
      throw new AppError("Wrong email/password", 401);
    }

    req.userIndex = userIndex;

    return next();
  } catch ({ statusCode, message }) {
    console.log(message);
    return res.status(statusCode).json(message);
  }
};

export default ensureUserExistsMiddleware;
