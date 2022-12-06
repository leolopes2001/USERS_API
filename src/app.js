import { compare, hash } from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import users from "./database";
import "dotenv/config";

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

  return jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
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

  return res.status(403).json({ message: "missing admin permissions" });
};

const ensureUserExistsById = (req, res, next) => {
  let id;

  switch (req.method) {
    case "PATCH":
    case "DELETE":
      id = req.params.id;
      break;
    case "GET":
      id = req.user.uuid;
      break;
  }

  const userIndex = users.findIndex((user) => user.uuid === id);

  if (userIndex === -1) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  switch (req.method) {
    case "DELETE":
      req.deleteUserIndex = userIndex;
      break;
    case "GET":
      req.retrieveUserIndex = userIndex;
      break;
    case "PATCH":
      req.updateUserIndex = userIndex;
      break;
  }

  return next();
};

const checkAdmPermissions = (req, res, next) => {
  const idUserTarget = req.params.id;
  const idUserSession = req.user.uuid;
  const userSession = users.find((user) => user.uuid === idUserSession);

  if (idUserTarget === idUserSession) return next();
  if (idUserTarget !== idUserSession && userSession.isAdm) return next();

  return res.status(403).json({ message: "missing admin permissions" });
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

  const token = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: uuid,
  });

  return [200, { token }];
};

const listUsersService = () => [200, users];

const retrieveUserService = (retrieveUserIndex) => {
  const foundUser = { ...users[retrieveUserIndex] };

  delete foundUser.password;

  return [200, foundUser];
};

const updateUserService = async (updateUserIndex, updateUserData) => {
  const { name, email, password } = updateUserData;

  const userUpdated = { ...users[updateUserIndex] };

  if (name) userUpdated.name = name;
  if (email) userUpdated.email = email;
  if (email) userUpdated.password = await hash(password, 10);
  userUpdated.updatedOn = new Date();

  users[updateUserIndex] = userUpdated;

  const userResponse = { ...userUpdated };

  delete userResponse.password;

  return [200, userResponse];
};

const deleteUserService = (deleteUserIndex) => {
  users.splice(deleteUserIndex, 1);
  return [204, {}];
};

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

const retrieveUserController = (req, res) => {
  const [status, user] = retrieveUserService(req.retrieveUserIndex);
  return res.status(status).json(user);
};

const updateUserController = async (req, res) => {
  const [status, user] = await updateUserService(req.updateUserIndex, req.body);
  return res.status(status).json(user);
};

const deleteUserController = (req, res) => {
  const [status, message] = deleteUserService(req.deleteUserIndex);
  return res.status(status).json(message);
};

// Routes------------------------------------------------------------

app.post("/users", ensureUserNotExists, createUserController);
app.post(
  "/login",
  ensureUserExists,
  ensurePasswordMatches,
  createSessionController
);
app.get("/users", ensureAuth, ensureAdm, listUsersController);
app.get(
  "/users/profile",
  ensureAuth,
  ensureUserExistsById,
  retrieveUserController
);
app.patch(
  "/users/:id",
  ensureAuth,
  ensureUserExistsById,
  checkAdmPermissions,
  updateUserController
);
app.delete(
  "/users/:id",
  ensureAuth,
  ensureUserExistsById,
  checkAdmPermissions,
  deleteUserController
);

app.listen(PORT, () => console.log(`App rodando na localhost:${PORT}`));
export default app;
