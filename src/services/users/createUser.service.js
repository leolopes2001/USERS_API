import { hash } from "bcryptjs";
import { v4 } from "uuid";
import users from "../../database";

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

export default createUserService;
