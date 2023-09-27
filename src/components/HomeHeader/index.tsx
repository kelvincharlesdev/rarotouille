import styles from "./styles.module.css";
import Logo from "../../assets/images/Logo.png";
import Cart from "../../assets/images/Cart.svg";
import { SearchBar } from "../SearchBar";
import { User } from "../User";

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
        <button>
          <img src={Cart} alt="Icone de carrinho" />{" "}
        </button>
      </div>
    </header>
  );
};
