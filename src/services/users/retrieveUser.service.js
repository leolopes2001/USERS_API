

const retrieveUserService = (user) => {
  delete user.password;

  return [200, user];
};

export default retrieveUserService;
