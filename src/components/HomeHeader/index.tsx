import styles from "./styles.module.css";
import Logo from "../../assets/images/Logo.png";
import { SearchBar } from "../SearchBar";
import { User } from "../User";
import { CartModal } from "../CartModal";

export const HomeHeader = () => {
  return (
    <header>
      <div className={styles.logoContent}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo Rarotouille" />
        </div>
        <SearchBar />
      </div>
      <div className={styles.rightHeaderContent}>
        <nav>
          <ul>
            <li>
              <a href="#orders">Pedidos</a>
            </li>
            <li>
              <a href="#favorites">Favoritos</a>
            </li>
          </ul>
        </nav>
        <User />
        <CartModal />
      </div>
    </header>
  );
};
