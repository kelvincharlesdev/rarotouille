import { Formik, Form } from "formik";
import { Background } from "../../components/Background";
import { Link } from "react-router-dom";
import { AuthTitle } from "../../components/AuthTitle";

export interface ITelephones {
  number: string;
}

export interface IAddresses {
  name: string;
  public_place: string;
  zip_code: string;
  number: string;
  neighborhood: string;
  reference: string;
  complement: string;
  city_id: string;
  latitude: string;
  longitude: string;
}

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
      longitude: ""
    }
  ],
  cpf: "",
  termsCheck: false
};

export const SignUpPassOne = () => {
  const [data, setData] = useState(SignUpInitialValues);
  const [currentForm, setCurrentForm] = useState(0);

  const submitSignUp = async formDados => {
    console.log("FormSubmit", formDados);

    try {
      await signUp(formDados);
    } catch (error) {
      console.log("Nao cadastrado", error);
    }
  };

  const handleNextForm = (
    newData: Partial<SignUpPostType>,
    isLastForm: false
  ) => {
    setData(prev => ({ ...prev, ...newData }));
    setCurrentForm(prev => prev + 1);

    if (isLastForm) {
      submitSignUp({ ...data, ...newData });
      return;
    }
  };

  const formSignUps = [
    <SignUp next={handleNextForm} data={data} />,
    <CompleteSingUp next={handleNextForm} data={data} />
  ];

  console.log("data", data);

  return (
    <Background image={CadastroImage}>{formSignUps[currentForm]}</Background>
  );
};

import { SignUpPostType } from "../../types/SignUpPostType";
import CadastroImage from "../../assets/images/ScooterPhone.png";
import { useState } from "react";
import { Input } from "../../components/Input";
import { ButtonForm } from "../../components/ButtonForm";
import styles from "./styles.module.css";
import { routes } from "../../routes";
import * as Yup from "yup";
import { errrorMessages } from "../../utils/messages";
import { signUp } from "../../service/apiPosts";
import { ErrorMessageType } from "../../types/ErrorMessageType";
import { FormFieldCheckBox } from "../../components/InputCheckbox";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required(errrorMessages.name.required)
    .matches(/^[A-Za-z]{3,}( [A-Za-z]{3,})+$/, errrorMessages.name.required),
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
          /^(?:\+\d{1,4}[ -]?)?(?:\d{2,4}[ -]?)*\d{3,4}[ -]?\d{3,4}$/,

          errrorMessages.telephones_attributes.invalid
        )
    })
  ),
  termsCheck: Yup.bool().isTrue(errrorMessages.termsCheck.required)
});

const SignUp = props => {
  const handleSubmit = values => {
    props.next(values);
  };

  return (
    <Formik<SignUpPostType>
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className={styles.loginContent} autoComplete="off">
          <div className={styles.formContent}>
            <AuthTitle
              title="Crie sua conta"
              subTitle="e peça já o seu prato"
            />
            <div className={styles.inputsContent}>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Nome Completo"
                errors={touched.name && errors.name}
              />

              <Input
                id="email"
                type="text"
                name="email"
                placeholder="Email"
                errors={touched.email && errors.email}
              />

              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Senha"
                errors={touched.password && errors.password}
              />

              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                placeholder="Confirmar senha"
                errors={
                  touched.password_confirmation && errors.password_confirmation
                }
              />

              <Input
                id="cpf"
                type="text"
                name="cpf"
                placeholder="CPF"
                errors={touched.cpf && errors.cpf}
              />

              {values.telephones_attributes.map((_, index) => (
                <Input
                  key={index}
                  id={`telephones_attributes[${index}]`}
                  type="phone"
                  name={`telephones_attributes[${index}].number`}
                  placeholder="Telefone"
                  // {// TODO Corrigir erro de yup}
                  errors={
                    false
                    // touched.telephones_attributes &&
                    // (errors.telephones_attributes as ErrorMessageType)
                  }
                />
              ))}

              <FormFieldCheckBox
                id="termsCheck"
                type="checkbox"
                name="termsCheck"
                errors={touched.termsCheck && errors.termsCheck}
              />
            </div>

            <ButtonForm text="Cadastrar" type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

const CompleteSingUp = props => {
  const handleSubmit = values => {
    props.next(values, true);
  };
  return (
    <Formik<SignUpPostType>
      initialValues={props.data}
      onSubmit={handleSubmit}
      // validationSchema={}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.loginContent} autoComplete="off">
          <AuthTitle title="Complete seu Cadastro" />
          <div className={styles.formContent}>
            <div className={styles.inputsContent}>
              {/* <Input  
                id="email"
                type="text"
                name="email"
                placeholder="Digite seu email"
                errors="errouuu"
              /> */}
            </div>

            <button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
            >
              Pular
            </button>

            <ButtonForm
              text="Completar Cadastrar"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
