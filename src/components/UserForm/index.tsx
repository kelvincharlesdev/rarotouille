import { Form, Formik } from "formik";
import { updateClient } from "../../service/apiPuts";
import { ClientType } from "../../types/ClientType";
import { UserResponseType } from "../../types/UserResponseType"
import { ButtonForm } from "../ButtonForm";
import { Input } from "../Input";
import styles from "./styles.module.css";
import { useState } from "react";
import { errrorMessages, successMessages } from "../../utils/messages";
import { userUpdateShema } from "../../utils/validationsSchemas";
import { useAuthContext } from "../../contexts/AuthContext";

interface UserFormProps {
    user: UserResponseType;
}

export const UserForm = ({ user }: UserFormProps) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const {updateUser} = useAuthContext();


    const initialValuesUpdate = {
        name: user.name,
        email: user.email,
        telephones_attributes: user.telephones,
        addresses_attributes: user.addresses,
    }

    const onSubmitUpdate = async (values: ClientType) => {
        const res = await updateClient(values);
        if (res?.status === 200) {
            setShowErrorMessage(false)
            setShowSuccessMessage(true);
            updateUser(res.data);
        }else{
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        }
    }

    return(
        
    <Formik<ClientType>
    initialValues={initialValuesUpdate}
    onSubmit={onSubmitUpdate}
    validationSchema={userUpdateShema}
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ errors, touched }) => (
      <Form className={styles.loginContent} autoComplete="off">
        <div className={styles.formContent}>
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
          </div>
          <section className={styles.ButtonAndMessage}>
            
          <ButtonForm text="Enviar" type="submit" />
                  {showSuccessMessage && <p className={styles.successMessage}>{successMessages.user.update}</p>}
                            {showErrorMessage && <p className={styles.successMessage}>{errrorMessages.error.update}</p>}
          </section>
        </div>
      </Form>
    )}
  </Formik>

    );
}