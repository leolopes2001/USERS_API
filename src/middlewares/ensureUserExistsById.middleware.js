import users from "../database";

const ensureUserExistsByIdMiddleware = (req, res, next) => {
  let id;

  switch (req.method) {
    case "PATCH":
    case "DELETE":
      id = req.params.id;
      break;
    case "GET":
      id = req.user.uuid;
      break;
  }

  const userIndex = users.findIndex((user) => user.uuid === id);

  if (userIndex === -1) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  switch (req.method) {
    case "DELETE":
      req.deleteUserIndex = userIndex;
      break;
    case "GET":
      req.retrieveUserIndex = userIndex;
      break;
    case "PATCH":
      req.updateUserIndex = userIndex;
      break;
  }

  return next();
};

export default ensureUserExistsByIdMiddleware;
