import styles from "./styles.module.css";
import UserIcon from "../../assets/images/User.png";
import { LogoutButton } from "../LogoutButton";
import { useAuthContext } from "../../contexts/AuthContext";

export const User = () => {
  const { isAuthenticated, user } = useAuthContext();
  return (
    <div className={styles.userContainer}>
      <img src={UserIcon} alt="Ícone de usuário" />
      <div className={styles.userDetails}>
        {isAuthenticated && <p className={styles.username}>{user?.name}</p>}

        <LogoutButton />
      </div>
    </div>
  );
};
