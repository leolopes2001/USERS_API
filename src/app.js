import { compare, hash } from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import users from "./database";

const PORT = 3001;
const app = express();
app.use(express.json());

// Middlewares-----------------------------------------------------

const ensureUserNotExists = (req, res, next) => {
  const foundUser = users.find((user) => user.email === req.body.email);

  if (!foundUser) return next();

  return res.status(409).json({ message: "E-mail already registered" });
};

const ensureUserExists = (req, res, next) => {
  const userIndex = users.findIndex((user) => user.email === req.body.email);
  req.userIndex = userIndex;

  if (userIndex !== -1) return next();

  return res.status(401).json({ message: "Wrong email/password" });
};

const ensurePasswordMatches = async (req, res, next) => {
  const { password } = users[req.userIndex];

  const passwordMatch = await compare(req.body.password, password);

  if (passwordMatch) return next();

  return res.status(401).json({ message: "Wrong email/password" });
};

const ensureAuth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  const token = authToken.split(" ")[1];

  return jwt.verify(token, "SECRET_KEY", (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Missing authorization headers",
      });
    }

    req.user = {
      uuid: decoded.sub,
    };

    return next();
  });
};

const ensureAdm = (req, res, next) => {
  const user = users.find((user) => user.uuid === req.user.uuid);

  if (user.isAdm) return next();

  return res.status(401).json({ message: "missing admin permissions" });
};

// Services---------------------------------------------------------

const createUserService = async (userData) => {
  const newUser = {
    ...userData,
    uuid: v4(),
    password: await hash(userData.password, 10),
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  users.push({ ...newUser });

  delete newUser.password;

  return [201, newUser];
};

const createSessionService = (email, userIndex) => {
  const { uuid } = users[userIndex];

  const token = jwt.sign({ email }, "SECRET_KEY", {
    expiresIn: "24h",
    subject: uuid,
  });

  return [200, { token }];
};

const listUsersService = () => [200, users];

// Controllers-------------------------------------------------------

const createUserController = async (req, res) => {
  const [status, user] = await createUserService(req.body);
  return res.status(status).json(user);
};

const createSessionController = (req, res) => {
  const [status, token] = createSessionService(req.body.email, req.userIndex);
  return res.status(status).json(token);
};

const listUsersController = (req, res) => {
  const [status, users] = listUsersService();
  return res.status(status).json(users);
};

const retrieveUserController = (req, res) => {};
const updateUserController = (req, res) => {};
const deleteUserController = (req, res) => {};

// Routes------------------------------------------------------------

app.post("/users", ensureUserNotExists, createUserController);
app.post(
  "/login",
  ensureUserExists,
  ensurePasswordMatches,
  createSessionController
);
app.get("/users", ensureAuth, ensureAdm, listUsersController);
app.get("/users/profile", retrieveUserController);
app.patch("/users/:uuid", updateUserController);
app.delete("/users/:uuid", deleteUserController);

app.listen(PORT, () => console.log(`App rodando na localhost:${PORT}`));
export default app;
