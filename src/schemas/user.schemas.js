import * as yup from "yup";
import { hashSync } from "bcryptjs";

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(4)
    .transform((password) => hashSync(password, 10))
    .required(),
  isAdm: yup.boolean().required(),
});

const userReturnedData = yup.object().shape({
  uuid: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  isAdm: yup.boolean(),
  createdOn: yup.date(),
  updatedOn: yup.date(),
});

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup
    .string()
    .min(4)
    .transform((password) => hashSync(password, 10)),
});

const listUsersReturnedData = yup.array(userReturnedData);

export {
  createUserSchema,
  userReturnedData,
  listUsersReturnedData,
  updateUserSchema,
};
