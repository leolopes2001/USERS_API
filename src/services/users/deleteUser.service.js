import users from "../../database";

const deleteUserService = (deleteUserIndex) => {
  users.splice(deleteUserIndex, 1);
  return {};
};

export default deleteUserService;
