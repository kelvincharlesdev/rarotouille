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

export const resetPasswordInitialValues: ResetPasswordType = {
  reset_password_token: "",
  password: "",
  password_confirmation: ""
};

export const SignUpInitialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  telephones_attributes: [
    {
      number: ""
    }
  ],
  addresses_attributes: [
    {
      name: "",
      public_place: "",
      zip_code: "",
      number: "",
      neighborhood: "",
      reference: "",
      complement: "",
      city_id: "",
      latitude: "",
      longitude: "",
      city: ""
    }
  ],
  cpf: "",
  termsCheck: false
};

export const ratingInitialValues = {
  rate: 0,
  comment: ""
};
