import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";
import cartIcon from "../../assets/svgs/CartIconButton.svg"

//TODO ajeitar o props do button form

interface ButtonAddToCartProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?(): void;
}

export const ButtonAddToCart = ({ text, type, disabled, onClick }: ButtonAddToCartProps) => {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <article className={styles.text}>{text} <img src={cartIcon} alt="iconAddToCart" /></article>
    </button>
  );
};
