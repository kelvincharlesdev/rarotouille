import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";
import { ErrorMessageType } from "../../types/ErrorMessageType";
import { CustomErrorMessage } from "../CustomErrorMessage";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: ErrorMessageType;
}

export const Input = ({ name, type, placeholder, errors }: FormInputProps) => {
  return (
    <div className={styles.inputContent}>
      <div className={styles.input}>
        <Field
          className={styles.field}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
      {errors ? <CustomErrorMessage message={errors} /> : null}
    </div>
  );
};
