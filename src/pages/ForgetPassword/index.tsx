import { Background } from "../../components/Background";
import Lock from "../../assets/images/Lock.png";
import { Form, Formik } from "formik";
import { ForgetPasswordType } from "../../types/ForgetPasswordType";
import { forgetPassword } from "../../utils/initialValues";
import { forgetPasswordSchema } from "../../utils/validationsSchemas";
import { AuthTitle } from "../../components/AuthTitle";
import { Input } from "../../components/Input";
import { ButtonForm } from "../../components/ButtonForm";
import styles from "./styles.module.css";
import { forgetPassord } from "../../service/apiPosts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const [resetToken, setResetToken] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: ForgetPasswordType) => {
    try {
      const response = await forgetPassord(values);
      const token = response?.data.reset_password_token;
      console.log(
        "Token de redefinição de senha solicitado com sucesso",
        token
      );

      setResetToken(token);
      setSubmitted(true);
    } catch (error) {
      console.log("Erro:", error);
    }
  };
  const copyToken = () => {
    navigator.clipboard.writeText(resetToken).then(() => {
      setCopied(true);
    });
  };

  const navigateToResetPassword = () => {
    navigate("/resetpassword");
  };

  return (
    <Background image={Lock} alt={"Cadeado"}>
      {submitted ? (
        <div className={styles.contenteReset}>
          <AuthTitle
            title={"Copie seu Token"}
            subTitle="Token de redefinição de senha:"
          />
          <div className={styles.tokenForm}>
            <div className={styles.tokenContainer}>
              <p className={styles.token}>{resetToken}</p>
              <button className={styles.copy} type="button" onClick={copyToken}>
                Copiar
              </button>
            </div>
            {copied && (
              <p className={styles.copiedToken}>Token copiado com sucesso!</p>
            )}
          </div>
          <ButtonForm onClick={navigateToResetPassword} text={"Avançar"} />
        </div>
      ) : (
        <Formik<ForgetPasswordType>
          initialValues={forgetPassword}
          onSubmit={handleSubmit}
          validationSchema={forgetPasswordSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.forgetContent} autoComplete="off">
              <AuthTitle
                title="Recupere sua senha"
                subTitle="Informe o seu email no campo abaixo e lhe enviaremos um código"
              />
              <div className={styles.formContent}>
                <div className={styles.inputsContent}>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Digite seu email"
                    errors={touched?.email && errors.email}
                  />
                </div>
                <ButtonForm
                  text="Enviar Código"
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
