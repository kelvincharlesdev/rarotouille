import React, { useState, useEffect } from "react";
import { Cart } from "../Cart";
import CartSVG from "../../assets/images/Cart.svg";
import styles from "./styles.module.css";

export const CartModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscapeKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [isOpen]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button onClick={openModal} type="submit">
        <img alt="Cart" src={CartSVG} />
      </button>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <Cart isOpen={isOpen} setIsOpen={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};
