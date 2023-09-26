import styles from "./styles.module.css";
import closeIcon from "../../assets/images/Close.svg";
import dishImageExample from "../../assets/images/DishExample.png";
import trashIcon from "../../assets/images/Trash.png";
import { ButtonForm } from "../ButtonForm";

interface CartProps {
  isOpen: boolean;
}

export const Cart = ({ isOpen }: CartProps) => {
  //TODO tentar por o ternário e trocar essa imagem pela do prato
  if (isOpen) {
    return (
      <div className={styles.cartContainer}>
        <header className={styles.cartHeader}>
          <button type="button" className={styles.closeButton}>
            <img src={closeIcon} alt="closeIcon" />
          </button>
          <p className={styles.headerTitle}>Carrinho</p>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.mainContentHeader}>
            <p className={styles.chefName}>Nome do chef</p>
          </div>
          <div className={styles.productLine}>
            <div className={styles.removeAndProductInfosContent}>
              <button className={styles.trashButton} type="button">
                <img src={trashIcon} alt="trashIcon" />
              </button>
              <div className={styles.imageNamePriceContent}>
                <img
                  src={dishImageExample}
                  alt="dishImage"
                  className={styles.dishImage}
                />
                <section className={styles.nameAndPriceSection}>
                  <p className={styles.dishName}>Nome do prato</p>
                  <p className={styles.dishPrice}>Preço</p>
                </section>
              </div>
            </div>
            <section className={styles.dishQtdControl}>
              <button className={styles.removeUnit} type="button">
                -
              </button>
              <p className={styles.qtdText}>10</p>
              <button className={styles.addUnit} type="button">
                +
              </button>
            </section>
          </div>

          <div className={styles.mainContentFooter}>
            <p className={styles.removeAllText}>Remover todos os pratos</p>
          </div>
        </main>
        <footer className={styles.cartFooter}>
          <div className={styles.totalPriceContent}>
            <p className={styles.totalText}>Total</p>
            <p className={styles.totalPriceText}>R$45,00</p>
          </div>
          <ButtonForm text="Continuar a compra" type="button" />
        </footer>
      </div>
    );
  } else return null;
};
