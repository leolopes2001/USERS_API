import users from "../../database";
import jwt from "jsonwebtoken";

const createSessionService = (email, userIndex) => {
  const { uuid } = users[userIndex];

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: uuid,
  });

  return [200, { token }];
};

export default createSessionService;
