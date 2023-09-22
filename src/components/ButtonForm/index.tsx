import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?(): void;
}

export const ButtonForm = ({ text, type, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <article className={styles.text}>{text}</article>
    </button>
  );
};
