import { hash } from "bcryptjs";
import { database } from "../../database";

const createUserService = async (userData) => {
  const { name, email, isAdm } = userData;

  const password = await hash(userData.password, 10);

  const queryResponse = await database.query(
    `INSERT INTO
	        users(name,email,"password",isAdm)
      VALUES
	        ($1, $2, $3, $4)
      RETURNING *;`,
    [name, email, password, isAdm]
  );

  return [201, queryResponse.rows[0]];
};

export default createUserService;
