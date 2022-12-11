import * as yup from "yup";
import { hashSync } from "bcryptjs";

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(4)
    .transform((pass) => hashSync(pass, 10))
    .required(),
  is_adm: yup.boolean().required(),
});

const userReturnedData = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  is_adm: yup.boolean(),
  created_on: yup.date(),
  updated_on: yup.date(),
});

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  password: yup
    .string()
    .min(4)
    .transform((pass) => hashSync(pass, 10)),
});

const listUsersReturnedData = yup.array(userReturnedData);

export {
  createUserSchema,
  userReturnedData,
  listUsersReturnedData,
  updateUserSchema,
};
