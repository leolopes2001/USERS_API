import users from "../../database";
import { listUsersReturnedData } from "../../schemas/user.schemas";

const listUsersService = async () => {
  const returnedData = await listUsersReturnedData.validate(users, {
    stripUnknown: true,
  });

  
  return [200, returnedData];
};
export default listUsersService;
