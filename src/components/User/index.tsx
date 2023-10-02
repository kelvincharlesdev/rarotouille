import styles from "./styles.module.css";
import UserIcon from "../../assets/images/User.png";
import { LogoutButton } from "../LogoutButton";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

export const User = () => {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <div className={styles.userContainer}>
      <Link
        className={styles.link}
        to={isAuthenticated ? routes.profile : "/"}
      >
        <img src={UserIcon} alt="Ícone de usuário" />
      </Link>
      <div className={styles.userDetails}>
        {isAuthenticated && <p className={styles.username}>{user?.name}</p>}
        <LogoutButton />
      </div>
    </div>
  );
};
