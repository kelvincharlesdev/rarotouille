import { Formik, Form, getIn } from "formik";
import { SignUpPostType } from "../../types/SignUpPostType";
import { AuthTitle } from "../AuthTitle";
import { Input } from "../Input";
import styles from "./styles.module.css";
import { FormFieldCheckBox } from "../InputCheckbox";
import { ButtonForm } from "../ButtonForm";
import { signUpSchema } from "../../utils/validationsSchemas";
import React from "react";

export interface ISignUpProps {
  data: SignUpPostType;
  next: (values: SignUpPostType, isLastForm: boolean) => void;
}

export const SignUp: React.FC<ISignUpProps> = ({ data, next }) => {
  const handleSubmit = (values: SignUpPostType) => {
    next(values, false);
  };

  return (
    <Formik<SignUpPostType>
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={signUpSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, values }) => (
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
                  errors={getIn(
                    touched.telephones_attributes &&
                      errors.telephones_attributes,
                    `[${index}].number`
                  )}
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
