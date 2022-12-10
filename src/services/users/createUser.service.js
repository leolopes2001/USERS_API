import { v4 } from "uuid";
import users from "../../database";
import { userReturnedData } from "../../schemas/user.schemas";

const createUserService = async (userData) => {
  console.log(userData);
  const newUser = {
    uuid: v4(),
    ...userData,
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  users.push(newUser);

  const returnedUser = await userReturnedData.validate(newUser, {
    stripUnknown: true,
  });

  return [201, returnedUser];
};

export default createUserService;
