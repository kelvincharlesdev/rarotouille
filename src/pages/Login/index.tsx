import { Form, Formik } from "formik";
import { LoginPostType } from "../../types/LoginPostType";
import { loginInitialValues } from "../../utils/initialValues";
import { Background } from "../../components/Background";
import LoginImage from "../../assets/images/Cloche.png";
import { Input } from "../../components/Input";
import { ButtonForm } from "../../components/ButtonForm";
import { AuthTitle } from "../../components/AuthTitle";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { routes } from "../../routes";
import { errrorMessages } from "../../utils/messages";
import { login } from "../../service/apiPosts";
import { useState } from "react";
import { CustomErrorMessage } from "../../components/CustomErrorMessage";
import { loginSchema } from "../../utils/validationsSchemas";
import { useAuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthContext();
  const submitiLogin = async (values: LoginPostType) => {
    const response = await login(values);

    if (response === "Error 401") {
      setIsInvalidLogin(true);
    } else if (response?.status === 200) {
      setIsAuthenticated(true);
      navigate(routes.home);
    }
  };

  return (
    <Background image={LoginImage} alt="Imagem da Clouche">
      <Formik<LoginPostType>
        initialValues={loginInitialValues}
        onSubmit={submitiLogin}
        validationSchema={loginSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.loginContent} autoComplete="off">
            <AuthTitle title="Faça seu login" />
            <div className={styles.formContent}>
              <div className={styles.inputsContent}>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Digite seu email"
                  errors={touched?.email && errors.email}
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Senha"
                  errors={touched.password && errors?.password}
                />
                <Link
                  to={routes.forgetPassword}
                  className={styles.subtitleText}
                >
                  Esquece a sua senha?
                </Link>
                {isInvalidLogin ? (
                  <CustomErrorMessage
                    message={errrorMessages.login.notRegistered}
                  />
                ) : null}
              </div>
              <ButtonForm text="Login" type="submit" disabled={isSubmitting} />
              <span className={styles.subtitleText}>
                Não possui uma conta?
                <Link to={routes.signupPassOne} className={styles.linkSignUp}>
                  Faça o seu cadastro
                </Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </Background>
  );
};
