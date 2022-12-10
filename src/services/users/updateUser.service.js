import { hash } from "bcryptjs";
import users from "../../database";
import { userReturnedData } from "../../schemas/user.schemas";

const updateUserService = async (updateUserIndex, updateUserData) => {
  const { name, email, password } = updateUserData;

  
  console.log(updateUserData);
  const userUpdated = { ...users[updateUserIndex] };


  if (name) userUpdated.name = name;
  if (email) userUpdated.email = email;
  if (password) userUpdated.password = password;
  userUpdated.updatedOn = new Date();

  users[updateUserIndex] = userUpdated;

  console.log(userUpdated);

  const updatedUser = await userReturnedData.validate(userUpdated, {
    stripUnknown: true,
  });

  console.log("-------------------");
  console.log(updatedUser);
  return [200, updatedUser];
};

export default updateUserService;
