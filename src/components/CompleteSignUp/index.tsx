import { Formik, Form, getIn, Field, ErrorMessage } from "formik";
import { SignUpPostType } from "../../types/SignUpPostType";
import { AuthTitle } from "../AuthTitle";
import { Input } from "../Input";
import { ButtonForm } from "../ButtonForm";
import styles from "./styles.module.css";
import { OnBlurbuscaEndereco } from "../../pages/SignUpPassOne";
import { completeSignUpSchema } from "../../utils/validationsSchemas";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

interface ICompleteSignUpProps {
  data: SignUpPostType;
  next: (values: SignUpPostType, flag: boolean, clicouPular: boolean) => void;
  prev: (values: SignUpPostType) => void;
}

export const CompleteSignUp: React.FC<ICompleteSignUpProps> = props => {
  const [pular, setPular] = useState(false);

  const handleSubmit = (values: SignUpPostType) => {
    values.addresses_attributes.every(address => {
      for (const key in address) {
        if (address[key] !== "") {
          return false;
        }
      }
      return true;
    });

    props.next(values, true, pular);
  };

  return (
    <Formik<SignUpPostType>
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={completeSignUpSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
        <Form className={styles.loginContent} autoComplete="off">
          <div className={styles.contentTitle}>
            <AuthTitle
              title="Complete seu Cadastro"
              subTitle="para ter acesso a todas as vantagens da Rarotouille"
            />
          </div>

          <div className={styles.inputsContent}>
            {values.addresses_attributes.map((_, index) => (
              <div className={styles.inputsContent} key={index}>
                <Input
                  id={`addresses_attributes[${index}].zip_code`}
                  type="text"
                  name={`addresses_attributes[${index}].zip_code`}
                  placeholder="Cep"
                  onBlur={e => OnBlurbuscaEndereco(e, setFieldValue, index)}
                  errors={getIn(
                    touched.addresses_attributes && errors.addresses_attributes,
                    `[${index}].zip_code`
                  )}
                />

                <Input
                  id={`addresses_attributes[${index}].public_place`}
                  type="text"
                  name={`addresses_attributes[${index}].public_place`}
                  placeholder="Rua"
                  errors={false}
                />

                <div className={styles.contentInput}>
                  <div className={styles.inputNeighborhood}>
                    <Field
                      className={styles.field}
                      id={`addresses_attributes[${index}].neighborhood`}
                      type="text"
                      name={`addresses_attributes[${index}].neighborhood`}
                      placeholder="Bairro"
                      errors={getIn(
                        touched.addresses_attributes &&
                          errors.addresses_attributes,
                        `[${index}].neighborhood`
                      )}
                    />
                  </div>

                  <div className={styles.inputNumber}>
                    <Field
                      inputSize="small"
                      className={styles.fiel}
                      id={`addresses_attributes[${index}].number`}
                      type="text"
                      name={`addresses_attributes[${index}].number`}
                      placeholder="Número"
                      errors={getIn(
                        touched.addresses_attributes &&
                          errors.addresses_attributes,
                        `[${index}].number`
                      )}
                    />

                    <ErrorMessage
                      name={`addresses_attributes[${index}].number`}
                    />
                  </div>
                </div>

                <Input
                  id={`addresses_attributes[${index}].city`}
                  type="text"
                  name={`addresses_attributes[${index}].city`}
                  placeholder="Cidade"
                  errors={getIn(
                    touched.addresses_attributes && errors.addresses_attributes,
                    `[${index}].city`
                  )}
                />

                <Input
                  id={`addresses_attributes[${index}].reference`}
                  type="text"
                  name={`addresses_attributes[${index}].reference`}
                  placeholder="Ponde de referencia"
                  errors={getIn(
                    touched.addresses_attributes && errors.addresses_attributes,
                    `[${index}].reference`
                  )}
                />
              </div>
            ))}

            <button
              className={styles.btn}
              type="submit"
              disabled={isSubmitting}
              onClick={() => setPular(true)}
            >
              Pular
            </button>

            <ButtonForm
              text="Completar Cadastrar"
              type="submit"
              disabled={isSubmitting}
              onClick={() => setPular(true)}
            />

            <button
              className={styles.btn}
              type="button"
              onClick={() => props.prev(values)}
            >
              Voltar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
