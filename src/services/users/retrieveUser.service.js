import users from "../../database";

const retrieveUserService = (retrieveUserIndex) => {
  const foundUser = { ...users[retrieveUserIndex] };

  delete foundUser.password;

  return [200, foundUser];
};

export default retrieveUserService;
