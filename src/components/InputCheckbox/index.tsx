import { InputHTMLAttributes } from "react";
import { Field } from "formik";
import { ErrorMessageType } from "../../types/ErrorMessageType";
import styles from "./styles.module.css";
import { CustomErrorMessage } from "../CustomErrorMessage";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: ErrorMessageType;
}

export const FormFieldCheckBox = ({
  id,
  name,
  type,
  errors
}: FormFieldProps) => {
  return (
    <section className={styles.registerCheckBox}>
      <div className={styles.contentField}>
        <Field
          className={styles.formFieldCheckBox}
          id={id}
          name={name}
          type={type}
        />
        <span className={styles.textRegisterCheckBox}>
          Declaro que li e concordo com os termos e condições de uso.
        </span>
      </div>

      {errors ? <CustomErrorMessage message={errors} /> : null}
    </section>
  );
};
