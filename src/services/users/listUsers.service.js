import { database } from "../../database";

const listUsersService = async () => {
  const listUsers = await database
    .query(`SELECT * FROM users;`)
    .then((res) => res.rows);

  return [200, listUsers];
};

export default listUsersService;
