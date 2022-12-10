import users from "../../database";
import { userReturnedData } from "../../schemas/user.schemas";

const retrieveUserService = async (retrieveUserIndex) => {
  const foundUser = { ...users[retrieveUserIndex] };

  const user = await userReturnedData.validate(foundUser, {
    stripUnknown: true,
  });

  return [200, user];
};

export default retrieveUserService;


