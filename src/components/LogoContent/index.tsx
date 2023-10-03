import styles from "./styles.module.css";
import Logo from "../../assets/images/LogoRarotouille.png";

export const LogoContent = () => {
  return (
    <>
      <div>
        <img className={styles.logo} src={Logo} alt="Logo" />
      </div>
    </>
  );
};
