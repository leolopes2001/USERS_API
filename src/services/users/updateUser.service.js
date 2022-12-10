import { userReturnedData } from "../../schemas/user.schemas";
import { hash } from "bcryptjs";

import { database } from "../../database";

const updateUserService = async (userId, updateUserData) => {
  const { name, email } = updateUserData;
  let password = "";
  if (updateUserData.password) {
    password = await hash(updateUserData.password, 10);
  }
  
  const updatedOn = new Date();
  
  const userUpdated = await database
  .query(
    `UPDATE 
        users
    SET 
        name = COALESCE(NULLIF($1,''), name),
        email = COALESCE(NULLIF($2,''), email),
        password = COALESCE(NULLIF($3,''), password),
          updated_on = $4
    WHERE id = $5 RETURNING *;
    `,
      [name || "", email || "", password, updatedOn, userId]
    )
    .then((res) => res.rows[0]);


          return   await userReturnedData.validate(userUpdated, {
      stripUnknown: true,
    });

  


  }

export default updateUserService;
