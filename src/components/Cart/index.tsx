import styles from "./styles.module.css";
import closeIcon from "../../assets/images/Close.svg";
import { useCartContext } from "../../contexts/CartContext";
import cartPurple from "../../assets/images/CartPurple.png";
import { useState } from "react";
import { CartStepTwo } from "../CartStepTwo";
import { CartStepOne } from "../CartStepOne";
import { CartStepThree } from "../CartStepThree";
import { CartStepFour } from "../CartStepFour";

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Cart = ({ isOpen, setIsOpen }: CartProps) => {
  const { cartOrders } = useCartContext();
  const [actualStep, setActualStep] = useState(0);

  const handleNextStep = async () => {
    setActualStep(prev => prev + 1);
  };

  const handlePrevStep = async () => {
    setActualStep(prev => prev - 1);
  };
  const steps = [
    <CartStepOne handleNextStep={handleNextStep} />,
    <CartStepTwo
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <CartStepThree setActualStep={setActualStep} />,
    <CartStepFour setActualStep={setActualStep} />
  ];
  //TODO tentar por o ternário e trocar essa imagem pela do prato
  if (isOpen) {
    return (
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src={closeIcon} alt="closeIcon" />
          </button>
          <p className={styles.headerTitle}>Carrinho</p>
        </div>
        {cartOrders.length > 0 ? (
          <>{steps[actualStep]}</>
        ) : (
          <>
            <main className={styles.mainContentEmpityCart}>
              <div className={styles.imageAndTextContent}>
                <p className={styles.empityCartTitle}>
                  Seu carrinho está vazio
                </p>
                <img
                  src={cartPurple}
                  alt="cartPurple"
                  className={styles.cartPurpleImage}
                />
              </div>
            </main>
            <div className={styles.cartFooterEmpityCart}>
              <p className={styles.empityCartSubTitle}>
                Adicione algum prato e melhore seu dia
              </p>
            </div>
          </>
        )}
      </div>
    );
  } else return null;
};
