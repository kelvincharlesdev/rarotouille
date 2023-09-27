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

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().test("email", errrorMessages.email.invalid, value => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value || "");
  })
});

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required(errrorMessages.name.required)
    .min(4, errrorMessages.name.minEight)
    .matches(/^[A-Za-z]{3,}( [A-Za-z]+)+$/, errrorMessages.name.required),
  email: Yup.string()
    .test("email", errrorMessages.email.invalid, value => {
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value || "");
    })
    .required(errrorMessages.email.required),
  password: Yup.string()
    .required(errrorMessages.password.required)
    .matches(/[A-Z]/, errrorMessages.password.upperCaseCharacter)
    .min(8, errrorMessages.password.minEight),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], errrorMessages.password_confirmation.ref)
    .required(errrorMessages.password_confirmation.required),
  cpf: Yup.string()
    .required(errrorMessages.cpf.required)
    .min(11, errrorMessages.cpf.minMax)
    .max(14, errrorMessages.cpf.minMax)
    .matches(
      /^\d{3}[\s\.\-_]?\d{3}[\s\.\-_]?\d{3}[\s\.\-_]?\d{2}$/,
      errrorMessages.cpf.invalid
    ),
  telephones_attributes: Yup.array().of(
    Yup.object().shape({
      number: Yup.string()
        .required(errrorMessages.telephones_attributes.required)
        .matches(
          /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/,

          errrorMessages.telephones_attributes.invalid
        )
    })
  ),
  termsCheck: Yup.bool().isTrue(errrorMessages.termsCheck.required)
});

export const completeSignUpSchema = Yup.object().shape({
  addresses_attributes: Yup.array().of(
    Yup.object().shape({
      zip_code: Yup.string().matches(
        /^\d{5}-\d{3}$|^$/,
        errrorMessages.zip_code.invalid
      )
    })
  )
});

export const resetPasswordSchema = Yup.object().shape({
  reset_password_token: Yup.string().required("Campo obrigatório"),
  password: Yup.string().required(errrorMessages.password.required),
  password_confirmation: Yup.string().required(
    errrorMessages.password_confirmation.required
  )
});

export const ratingSchema = Yup.object().shape({
  comment: Yup.string().required("Campo obrigatório"),
  rate: Yup.string()
    .required()
    .oneOf(["1", "2", "3", "4", "5"], "Selecione uma nota")
});

//TODO Verificar se vai precisar dessas validações

// public_place: Yup.string().matches(
//   /^[A-Za-z0-9][A-Za-z0-9 ,.\-]{4,}$/,
//   errrorMessages.public_place.invalid
// ),
// neighborhood: Yup.string().matches(
//   /^[A-Za-z0-9][A-Za-z0-9 ,.\-]{4,}$/,
//   errrorMessages.neighborhood.invalid
// ),
// number: Yup.string().matches(
//   /^\d+[A-Za-z]*$/,
//   errrorMessages.number.invalid
// ),
// city: Yup.string().matches(
//   /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
//   errrorMessages.city.invalid
// ),
// reference: Yup.string().min(4, errrorMessages.reference.minEight)
