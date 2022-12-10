
import { database } from "../../database";


import { listUsersReturnedData } from "../../schemas/user.schemas";

const listUsersService = async () => {

  const listUsers = await database
  .query(`SELECT * FROM users;`)
  .then((res) => res.rows);

  const returnedData = await listUsersReturnedData.validate(listUsers, {
    stripUnknown: true,
  });

  return returnedData;
};
export default listUsersService;
