import jwt from "jsonwebtoken";

const createSessionService = ({ id, email }) => {

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: id,
  });

  return { token };
};

export default createSessionService;
