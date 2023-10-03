import { useState } from "react";
import styles from "./styles.module.css";
import Logo from "../../assets/images/LogoHat.png";
import { SearchBar } from "../SearchBar";
import { User } from "../User";
import { CartModal } from "../CartModal";
import { Link } from "react-router-dom";

export const HomeHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className={styles.hamburguerContent}>
        <div className={styles.logoContent}>
          <Link className={styles.logo} to="/home">
            <img src={Logo} alt="Logo Rarotouille" />
          </Link>
          <SearchBar />
        </div>

        <div className={styles.contentCartHamburguer}>
          <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
            <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
            <div className={`${styles.bar} ${menuOpen ? styles.open : ""}`} />
          </div>
        </div>
      </div>

      <nav
        className={`${styles.rightHeaderContent} ${
          menuOpen ? styles.menuOpen : ""
        }`}
      >
        <ul>
          <li>
            <Link to="/orders">Pedidos</Link>
          </li>
          <li>
            <Link to="/favorites">Favoritos</Link>
          </li>
        </ul>
        <User />
      </nav>
      <CartModal />
    </header>
  );
};
