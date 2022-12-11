import * as yup from "yup";

const createSessionSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export { createSessionSchema };
