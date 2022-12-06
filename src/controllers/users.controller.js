import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import retrieveUserService from "../services/users/retrieveUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req, res) => {
  const [status, user] = await createUserService(req.body);
  return res.status(status).json(user);
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

export {
  createUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
