import { userReturnedData } from "../../schemas/user.schemas";

import { database } from "../../database";

const updateUserService = async (userId, updateUserData) => {
  const updated_on = new Date();

  let query = "UPDATE users SET ";
  const keys = Object.keys(updateUserData);
  const values = Object.values(updateUserData);

  keys.forEach((key, index) => {
    query += `${key} = \$${index + 1}, `;
  });

  query += `updated_on = \$${keys.length + 1} `;

  query += `WHERE id = \$${keys.length + 2} RETURNING *;`;

  const userUpdated = await database
    .query(query, [...values, updated_on, userId])
    .then((res) => res.rows[0]);

  return await userReturnedData.validate(userUpdated, {
    stripUnknown: true,
  });
};

export default updateUserService;
