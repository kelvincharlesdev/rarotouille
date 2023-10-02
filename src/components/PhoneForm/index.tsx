import { Form, Formik, FormikHelpers } from "formik";
import { updateClientTelephone } from "../../service/apiPuts";
import { TelephoneUpdateType } from "../../types/TelephoneUpdateType";
import { useState } from "react";
import { Input } from "../Input";
import { telephoneUpdateSchema } from "../../utils/validationsSchemas";
import { ButtonForm } from "../ButtonForm";
import { errrorMessages, successMessages } from "../../utils/messages";
import styles from "./styles.module.css";
import { postClientTelephone } from "../../service/apiPosts";
import { useListControlContext } from "../../contexts/ListControlContext";

interface PhoneFormProps {
  id?: string;
  number?: string;
}
//TODO colocar a cor verde no global modules

export const PhoneForm = ({ id, number }: PhoneFormProps) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const {updatePhone, addPhone} = useListControlContext();

  if (number && id) {
    const initialValuesUpdate = {
      number: number
    };
    const onSubmitUpdate = async (values: TelephoneUpdateType) => {
      if (id) {
        const res = await updateClientTelephone(id, values);
        if (res?.status === 200) {
          setShowErrorMessage(false);
          setShowSuccessMessage(true);
          updatePhone(id, res.data)
        } else {
          setShowSuccessMessage(false);
          setShowErrorMessage(true);
        }
      }
    };

    return (
      <Formik<TelephoneUpdateType>
        initialValues={initialValuesUpdate}
        onSubmit={onSubmitUpdate}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={telephoneUpdateSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles.formContent}>
            <Input
              name="number"
              id="number"
              type="text"
              errors={touched.number && errors.number}
            />
            <section className={styles.ButtonAndMessage}>
              <ButtonForm text="Enviar" type="submit" />
              {showSuccessMessage && (
                <p className={styles.successMessage}>
                  {successMessages.phone.update}
                </p>
              )}
              {showErrorMessage && (
                <p className={styles.successMessage}>
                  {errrorMessages.error.update}
                </p>
              )}
            </section>
          </Form>
        )}
      </Formik>
    );
  } else {
    const initialValuesAdd = {
      number: ""
    };

    const onSubmitAdd = async (
      values: TelephoneUpdateType,
      helper: FormikHelpers<TelephoneUpdateType>
    ) => {
      const res = await postClientTelephone(values);
      if (res?.status === 201) {
        helper.resetForm();
        setShowErrorMessage(false);
        setShowSuccessMessage(true);
        addPhone(res.data);
      } else {
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
      }
    };
    return (
      <Formik<TelephoneUpdateType>
        initialValues={initialValuesAdd}
        onSubmit={onSubmitAdd}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={telephoneUpdateSchema}
      >
        {({ errors, touched }) => (
          <Form className={styles.formContent}>
            <Input
              name="number"
              id="number"
              type="text"
              errors={touched.number && errors.number}
              placeholder="Digite um telefone"
            />
            <section className={styles.ButtonAndMessage}>
              <ButtonForm text="Enviar" type="submit" />
              {showSuccessMessage && (
                <p className={styles.successMessage}>
                  {successMessages.phone.add}
                </p>
              )}
              {showErrorMessage && (
                <p className={styles.successMessage}>
                  {errrorMessages.error.add}
                </p>
              )}
            </section>
          </Form>
        )}
      </Formik>
    );
  }
};
