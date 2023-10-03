import { ReactNode } from "react";
import styles from "./styles.module.css";
import closeIcon from "../../assets/images/Close.svg";
import { useEffect, useCallback } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

export const Modal = ({ children, isOpen, setIsOpen, title }: ModalProps) => {
  const onClickClose = () => {
    setIsOpen(false);
  };

  const onEscKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      const modalContent = document.querySelector(`.${styles.modalContent}`);

      if (modalContent && !modalContent.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    const handleEscKeyPress = (event: KeyboardEvent) => {
      onEscKeyPress(event);
    };

    const handleClickOutside = (event: MouseEvent) => {
      onClickOutside(event);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscKeyPress);
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("keydown", handleEscKeyPress);
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKeyPress);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onEscKeyPress, onClickOutside]);

  return (
    <>
      {isOpen && (
        <>
          <div className={styles.overlay}></div>
          <div
            className={`${styles.modalContent} ${
              isOpen ? styles.openModal : ""
            }`}
          >
            <div className={styles.modalHeader}>
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClickClose}
              >
                <img src={closeIcon} alt="closeIcon" />
              </button>
              <p className={styles.headerTitle}>{title}</p>
            </div>
            <div className={styles.formContent}>{children}</div>
          </div>
        </>
      )}
    </>
  );
};
