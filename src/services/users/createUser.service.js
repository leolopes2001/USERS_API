import { database } from "../../database";
import { AppError } from "../../errors";
import { userReturnedData } from "../../schemas/user.schemas";

const createUserService = async ({ name, email, is_adm, password }) => {
  const foundUser = await database
    .query(`SELECT email FROM users WHERE email = $1;`, [email])
    .then((res) => res.rows[0]);

  if (foundUser) throw new AppError("E-mail already registered", 409);

  const created_on = new Date();
  const updated_on = new Date();

  return await database
    .query(
      `INSERT INTO
	        users(name,email,"password",is_adm, created_on, updated_on)
      VALUES
	        ($1, $2, $3, $4, $5, $6)
      RETURNING 
          id, name, email, is_adm, created_on, updated_on;`,
      [name, email, password, is_adm, created_on, updated_on]
    )
    .then((res) => res.rows[0]);
};

export default createUserService;
