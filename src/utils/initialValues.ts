import { ForgetPasswordType } from "../types/ForgetPasswordType";
import { LoginPostType } from "../types/LoginPostType";
import { ResetPasswordType } from "../types/ResetPasswordType";

export const loginInitialValues: LoginPostType = {
  email: "",
  password: ""
};

export const forgetPassword: ForgetPasswordType = {
  email: ""
};

export const resetPassword: ResetPasswordType = {
  reset_password_token: "",
  password: "",
  password_confirmation: ""
};
