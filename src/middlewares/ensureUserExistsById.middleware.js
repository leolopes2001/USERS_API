import { database } from "../database";

const ensureUserExistsByIdMiddleware = async (req, res, next) => {
  let id;

  switch (req.method) {
    case "PATCH":
    case "DELETE":
      id = req.params.id;
      break;
    case "GET":
      id = req.user.id;
      break;
  }
  const foundUser = await database
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((res) => res.rows[0]);

  // const userIndex = users.findIndex((user) => user.uuid === id);

  if (!foundUser) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  switch (req.method) {
    case "DELETE":
      req.deleteUserIndex = userIndex;
      break;
    case "GET":
      req.user = { ...foundUser };
      break;
    case "PATCH":
      req.user = { ...foundUser };
      break;
  }

  return next();
};

export default ensureUserExistsByIdMiddleware;
