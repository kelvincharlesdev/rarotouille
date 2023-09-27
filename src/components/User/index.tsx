import styles from "./styles.module.css";
import UserIcon from "../../assets/images/User.png";
import { LogoutButton } from "../LogoutButton";

export const User = () => {
  return (
    <div className={styles.userContainer}>
      <img src={UserIcon} alt="Ícone de usuário" />
      <div className={styles.userDetails}>
        <p className={styles.username}>Nome</p>
        <LogoutButton />
      </div>
    </div>
  );
};
