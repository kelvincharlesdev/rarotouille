import styles from "./styles.module.css";
import QRCode from "react-qr-code";
import { useCartContext } from "../../contexts/CartContext";
import { useState } from "react";
import { ButtonForm } from "../ButtonForm";

interface CartStepThreeProps {
  setActualStep: (actualStep: number) => void;
}
//TODO ver se é simulação ou é pra ler o qr code
export const CartStepThree = ({ setActualStep }: CartStepThreeProps) => {
  const { paymentLink, paymentOptionIndex, payFinalOrder, finalOrder } = useCartContext();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(paymentLink).then(() => {
      setCopied(true);
    });
  };
  const payOrder = async () => {
    payFinalOrder(finalOrder.id);
    setActualStep(3)

  }

  switch (paymentOptionIndex) {
    case 0:
      return (
        <>
          <main className={styles.mainContent}>
            <div className={styles.imageAndTextContent}>
              <p className={styles.mainContentTitle}>Quase lá</p>
              <QRCode value={`${location.origin}/payQrCode/${finalOrder.id}`}/>
            </div>
          </main>
          <div className={styles.footerContent}>
            <button onClick={payOrder} className={styles.payButton}>Pagar</button>
            <p className={styles.footerText}>
              Escaneie o Qr code e conclua o pagamaneto
            </p>
          </div>
        </>
      );
    //TODO ver essa parte de link
    case 1:
      return (
        <>
          <main className={styles.mainContent}>
            <div className={styles.imageAndTextContent}>
              <p className={styles.link}>{paymentLink}</p>
              {copied ? (
                <p className={styles.linkCopiedMessage}>Link copiado!</p>
              ) : null}
              <button
                type="button"
                onClick={copyLink}
                className={styles.copyButton}
              >
                Copiar
              </button>
            </div>
          </main>
          <footer className={styles.footerContent}>
            {!copied ? (
              <p className={styles.footerText}>
                Aqui está o link do seu Qr code
              </p>
            ) : null}
            {copied ? <ButtonForm text="Pagar" /> : null}
          </footer>
        </>
      );
  }
};
