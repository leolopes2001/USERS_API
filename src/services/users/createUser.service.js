import { hash } from "bcryptjs";
import { database } from "../../database";

const createUserService = async (userData) => {
  const { name, email, is_adm } = userData;

  const created_on = new Date();
  const updated_on = new Date();
  const password = await hash(userData.password, 10);

  const newUser = await database
    .query(
      `INSERT INTO
	        users(name,email,"password",is_adm, created_on, updated_on)
      VALUES
	        ($1, $2, $3, $4, $5, $6)
      RETURNING *;`,
      [name, email, password, is_adm, created_on, updated_on]
    )
    .then((res) => res.rows[0]);

  delete newUser.password;

  console.log(newUser);
  return [201, newUser];
};

export default createUserService;
