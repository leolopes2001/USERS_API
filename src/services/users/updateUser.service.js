import { hash } from "bcryptjs";
import users from "../../database";

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

export default updateUserService;
