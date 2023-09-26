import { useCartContext } from "../../contexts/CartContext";
import styles from "./styles.module.css";
import trashIcon from "../../assets/images/Trash.png";
import { ButtonForm } from "../ButtonForm";
interface CartStepOneProps {
  handleNextStep: () => void;
}
//TODO arrumar o mostrador de preço
export const CartStepOne = ({ handleNextStep }: CartStepOneProps) => {
  const {
    chefsNames,
    cartOrders,
    totalPrice,
    addDishToCart,
    removeDishToCart,
    removeAllDishesToCart,
    removeOrderLine
  } = useCartContext();

  return (
    <>
      <main className={styles.mainContent}>
        {chefsNames.map((chefName, index) => (
          <div key={index} className={styles.orderLine}>
            <div className={styles.mainContentHeader}>
              <p className={styles.chefName}>{chefName}</p>
            </div>
            {cartOrders.map((orderTwo, index) => {
              if (chefName === orderTwo.dish.chef?.name) {
                return (
                  <div className={styles.productLine} key={index}>
                    <div className={styles.removeAndProductInfosContent}>
                      <button
                        className={styles.trashButton}
                        type="button"
                        onClick={() => removeOrderLine(orderTwo)}
                      >
                        <img src={trashIcon} alt="trashIcon" />
                      </button>
                      <div className={styles.imageNamePriceContent}>
                        <img
                          src={orderTwo.dish.images[0]}
                          alt="dishImage"
                          className={styles.dishImage}
                        />
                        <section className={styles.nameAndPriceSection}>
                          <p className={styles.dishName}>
                            {orderTwo.dish.name}
                          </p>
                          <p className={styles.dishPrice}>
                            {orderTwo.dish.unit_price}
                          </p>
                        </section>
                      </div>
                    </div>
                    <section className={styles.dishQtdControl}>
                      <button
                        className={styles.removeUnit}
                        type="button"
                        onClick={() => removeDishToCart(orderTwo.dish.id)}
                      >
                        -
                      </button>
                      <p className={styles.qtdText}>{orderTwo.amount}</p>
                      <button
                        className={styles.addUnit}
                        type="button"
                        onClick={() => addDishToCart(orderTwo.dish)}
                      >
                        +
                      </button>
                    </section>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
        <div
          className={styles.mainContentFooter}
          onClick={removeAllDishesToCart}
        >
          <p className={styles.removeAllText}>Remover todos os pratos</p>
        </div>
      </main>

      <footer className={styles.cartFooter}>
        <div className={styles.totalPriceContent}>
          <p className={styles.totalText}>Total</p>
          <p className={styles.totalPriceText}>
            {totalPrice.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </p>
        </div>
        <ButtonForm
          text="Continuar a compra"
          type="button"
          onClick={handleNextStep}
        />
      </footer>
    </>
  );
};
