import styles from "./styles.module.css";
import Logo from "../../assets/images/LogoHat.png";
import { SearchBar } from "../SearchBar";
import { User } from "../User";
import { CartModal } from "../CartModal";
import { Link } from "react-router-dom";

export const HomeHeader = () => {
  return (
    <header>
      <div className={styles.logoContent}>
        <Link className={styles.logo} to="/home">
          <img src={Logo} alt="Logo Rarotouille" />
        </Link>
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
