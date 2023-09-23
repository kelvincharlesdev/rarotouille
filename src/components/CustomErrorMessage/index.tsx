import { ErrorMessageType } from "../../types/ErrorMessageType";
import styles from "./styles.module.css";

interface ErrorMessageProps {
  message: ErrorMessageType;
}

export const CustomErrorMessage = ({ message }: ErrorMessageProps) => {
  console.log(message);

  return <span className={styles.errorMessage}>{message}</span>;
};
