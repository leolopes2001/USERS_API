import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureAuthMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = authToken.split(" ")[1];

  return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Missing authorization headers",
      });
    }

    req.user = {
      id: decoded.sub,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
