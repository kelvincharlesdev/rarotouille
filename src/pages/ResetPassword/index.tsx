import { AuthTitle } from "../../components/AuthTitle";
import { Background } from "../../components/Background";
import { resetPassword } from "../../service/apiPuts";
import { ResetPasswordType } from "../../types/ResetPasswordType";
import styles from "./styles.module.css";
import Lock from "../../assets/images/Lock.png";
import { Form, Formik } from "formik";
import { resetPasswordInitialValues } from "../../utils/initialValues";
import { Input } from "../../components/Input";
import { ButtonForm } from "../../components/ButtonForm";
import { resetPasswordSchema } from "../../utils/validationsSchemas";
import { useState } from "react";
//import { CheckAnimation } from "../../components/CheckAnimation";

export const ResetPassword = () => {
  const [resetSuccess, setResetSuccess] = useState(false);
  const handleSubmit = async (values: ResetPasswordType) => {
    try {
      await resetPassword(values);
      console.log("Senha resetada com sucesso");
      setResetSuccess(true);
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  return (
    <Background image={Lock} alt={"Cadeado"}>
      {resetSuccess ? (
        <div className={styles.success}>
          <AuthTitle
            title="Senha redefinida com sucesso!"
            subTitle="Faça o login com sua nova
           senha."
          />

          <ButtonForm text={"Voltar ao Login"} />
        </div>
      ) : (
        <Formik<ResetPasswordType>
          initialValues={resetPasswordInitialValues}
          onSubmit={handleSubmit}
          validationSchema={resetPasswordSchema}
          validateOnChange={false}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.forgetContent} autoComplete="off">
              <AuthTitle title="Informe o código e sua nova senha" />
              <div className={styles.formContent}>
                <div className={styles.inputsContent}>
                  <Input
                    id="reset_password_token"
                    type="text"
                    name="reset_password_token"
                    placeholder="Digite seu Token"
                    errors={
                      touched?.reset_password_token &&
                      errors.reset_password_token
                    }
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    errors={touched?.password && errors.password}
                  />
                  <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmar nova senha"
                    errors={
                      touched?.reset_password_token &&
                      errors.reset_password_token
                    }
                  />
                </div>
                <ButtonForm
                  text="Redefinir Senha"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Background>
  );
};
