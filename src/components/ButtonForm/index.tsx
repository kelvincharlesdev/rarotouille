import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const ButtonForm = ({ text, type, disabled }: ButtonProps) => {
  return (
    <button className={styles.button} type={type} disabled={disabled}>
      <article className={styles.text}>{text}</article>
    </button>
  );
};

