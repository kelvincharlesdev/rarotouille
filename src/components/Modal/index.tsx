import { ReactNode } from "react";
import styles from "./styles.module.css";
import closeIcon from "../../assets/images/Close.svg";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

export const Modal = ({ children, isOpen, setIsOpen, title }: ModalProps) => {
    const onClickClose = () =>{
        setIsOpen(!isOpen);
    }
  return (
    <div className={styles.modalContent}>
       <section className={styles.modalHeader}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClickClose}
          >
            <img src={closeIcon} alt="closeIcon" />
          </button>
          <p className={styles.headerTitle}>{title}</p>
        </section>
      <div className={styles.formContent}>{children}</div>
    </div>
  );
};