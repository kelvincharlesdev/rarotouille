import * as Yup from "yup";
import { errrorMessages } from "./messages";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .test("email", errrorMessages.email.invalid, value => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value || "");
    })
    .required(errrorMessages.email.required),
  password: Yup.string().required(errrorMessages.password.required)
});
