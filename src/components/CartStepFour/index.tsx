import styles from "./styles.module.css";
import success from "../../assets/images/Success.png";
import avaliate from "../../assets/images/Avaliate.png";
import { useState } from "react";
import { RatingForm } from "../RatingForm";
import { useCartContext } from "../../contexts/CartContext";

interface CartStepFourProps {
  setActualStep: (actualStep: number) => void;
}

export const CartStepFour = ({ setActualStep }: CartStepFourProps) => {
  const { removeAllDishesToCart } = useCartContext();
  const [stepPartial, setStepPartial] = useState(0);
  const backToCartStart = () => {
    removeAllDishesToCart();
    setActualStep(0);
    setTimeout(() => setActualStep(0), 5000);
  };

  switch (stepPartial) {
    case 0:
      return (
        <>
          <main className={styles.mainContent}>
            <div className={styles.imageAndTextContent}>
              <p className={styles.mainTitle}>Pagamento Realizado</p>
              <img
                src={success}
                alt="paymentSucces"
                className={styles.centerImage}
              />
            </div>
          </main>
          <div className={styles.cartFooter}>
            <p className={styles.footerTitle}>Agora é só aproveitar o prato!</p>
            <button
              className={styles.avaliateButton}
              onClick={() => setStepPartial(prev => prev + 1)}
            >
              Deixar uma avaliação
            </button>
            <button className={styles.backButton} onClick={backToCartStart}>
              Não, obrigado
            </button>
          </div>
        </>
      );
    case 1:
      return (
        <RatingForm
          setStepPartial={setStepPartial}
          setActualStep={setActualStep}
        />
      );
    case 2:
      return (
        <>
          <main className={styles.mainContent}>
            <div className={styles.imageAndTextContent}>
              <p className={styles.mainTitle}>Obrigado pela sua avaliação</p>
              <img
                src={avaliate}
                alt="avaliateImage"
                className={styles.centerImage}
              />
            </div>
          </main>
          <div className={styles.cartFooter}>
            <button className={styles.backButton} onClick={backToCartStart}>
              Continuar comprando
            </button>
            <p className={styles.footerTitle}>Ela nos ajuda muito!</p>
          </div>
        </>
      );
  }
};
