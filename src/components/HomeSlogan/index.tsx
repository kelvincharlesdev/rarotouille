import styles from "./styles.module.css";
import Scooter from "../../assets/images/ScooterHome.png";

export const HomeSlogan = () => {
  return (
    <div className={styles.sloganContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Bateu aquela fome?</h1>
        <h2 className={styles.subTitle}>
          A Rarotouille diminui a distância entre você e seu chef favorito.
          Aproveite e peça logo o prato que fará seu dia ainda melhor!
        </h2>
      </div>
      <img src={Scooter} alt="Purple Scooter Delivery" />
    </div>
  );
};
