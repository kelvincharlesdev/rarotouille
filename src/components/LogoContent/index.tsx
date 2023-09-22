import Logo from "../../assets/images/Logo.png";
import styles from "./styles.module.css";

export const LogoContent = () => {
  return (
    <>
      <div className={styles.logo}>
        <img className={styles.imageHat} src={Logo} alt="Logo Rarotouille" />
        <h1 className={styles.raro}>
          Raro<span className={styles.touille}>touille</span>
        </h1>
      </div>
    </>
  );
};
