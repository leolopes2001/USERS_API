import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUsersService from "../services/users/listUsers.service";
import retrieveUserService from "../services/users/retrieveUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req, res) => {
  const user = await createUserService(req.validatedBody);
  return res.status(201).json(user);
};

const listUsersController = async (req, res) => {
  const users = await listUsersService();
  return res.status(200).json(users);
};

const retrieveUserController = async (req, res) => {
  const [status, user] = await retrieveUserService(req.retrieveUserIndex);
  return res.status(status).json(user);
};

const updateUserController = async (req, res) => {
  if (!Object.keys(req.validatedBody).length) {
    return {};
  }
  console.log(req.validatedBody);

  const user = await updateUserService(req.user.id, req.validatedBody);
  return res.status(200).json(user);
};

const deleteUserController = (req, res) => {
  const data = deleteUserService(req.deleteUserIndex);
  return res.status(204).json(data);
};

export {
  createUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
