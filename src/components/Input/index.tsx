import { Field } from "formik";
import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ name, type, placeholder }: FormInputProps) => {
  return (
    <div className={styles.inputContent}>
      <Field
        className={styles.field}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
