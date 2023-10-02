import styles from "./styles.module.css";
import litleMap from "../../assets/images/LitleMap.png";
import money from "../../assets/images/Money.png";
import { ButtonForm } from "../ButtonForm";
import { useCartContext } from "../../contexts/CartContext";

interface CartStepTwoProps {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

//TODO colocar opção de trocar de endereço e forma de pagamento
export const CartStepTwo = ({
  handleNextStep,
  handlePrevStep
}: CartStepTwoProps) => {
  const submitOrder = async () => {
    finishOrder();
    //TODO Tratar erro
    handleNextStep();
  };
  const {
    userAddresses,
    totalPrice,
    finishOrder,
    switchDeliveryAddress,
    deliveryAddressIndex,
    paymentOptions,
    paymentOptionIndex,
    switchPaymentOption
  } = useCartContext();
  //TODO colocar um adicionar endereço
  if (userAddresses.length > 0) {
    return (
      <>
        <main className={styles.mainContent}>
          <div className={styles.mainContentHeader}>
            <p className={styles.mainLineTitle}>Será entregue em</p>
          </div>
          <div className={styles.mainLineInfo}>
            <div className={styles.imageAndInfosContent}>
              <img src={litleMap} alt="LitleMap" className={styles.lineImage} />
              <section className={styles.infoTitleAndSubTitle}>
                <p className={styles.infoTitle}>
                  {userAddresses[deliveryAddressIndex].public_place},{" "}
                  {userAddresses[deliveryAddressIndex].number},{" "}
                  {userAddresses[deliveryAddressIndex].neighborhood}
                </p>
                <p className={styles.infoSubTitle}>
                  {userAddresses[deliveryAddressIndex].complement}
                </p>
              </section>
            </div>

            <section className={styles.switchOptionSection}>
              <select
                className={styles.switchSelect}
                onChange={e => switchDeliveryAddress(e.target.value)}
              >
                <option disabled selected>
                  {" "}
                  Trocar
                </option>
                {userAddresses.map((address, index) => (
                  <option value={`${index}`}>
                    {address.public_place}, {address.number},{" "}
                    {address.neighborhood}
                  </option>
                ))}
              </select>
            </section>
          </div>
        </main>
        <main className={styles.mainContent}>
          <div className={styles.mainContentHeader}>
            <p className={styles.mainLineTitle}>Forma de Pagamento</p>
          </div>
          <div className={styles.mainLineInfo}>
            <div className={styles.imageAndInfosContent}>
              <img src={money} alt="money" className={styles.lineImage} />
              <section className={styles.infoTitleAndSubTitle}>
                <p className={styles.infoTitle}>
                  {paymentOptions[paymentOptionIndex].name}
                </p>
                <p className={styles.infoSubTitle}>
                  {paymentOptions[paymentOptionIndex].description}
                </p>
              </section>
            </div>

            <section className={styles.switchOptionSection}>
              <select
                className={styles.switchSelect}
                onChange={e => switchPaymentOption(e.target.value)}
              >
                <option disabled selected>
                  {" "}
                  Trocar
                </option>
                {paymentOptions.map((payment, index) => (
                  <option value={`${index}`}>{payment.name}</option>
                ))}
              </select>
            </section>
          </div>
        </main>

        <div className={styles.cartFooter}>
          <div className={styles.totalPriceContent}>
            <p className={styles.totalText}>Total</p>
            <p className={styles.totalPriceText}>
              {totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </p>
          </div>
          <button className={styles.backButton} onClick={handlePrevStep}>
            Voltar
          </button>
          <ButtonForm
            text="Finalizar o pedido"
            type="button"
            onClick={submitOrder}
          />
        </div>
      </>
    );
  }
};
