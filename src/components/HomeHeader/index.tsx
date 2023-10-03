import { useState } from "react";
import styles from "./styles.module.css";
import Logo from "../../assets/images/LogoHat.png";
import { SearchBar } from "../SearchBar";
import { User } from "../User";
import { CartModal } from "../CartModal";
import { Link } from "react-router-dom";
import { useListControlContext } from "../../contexts/ListControlContext";
import { ModalSwitchAddress } from "../ModalSwitchAddress";
import { Modal } from "../Modal";
import mapIcon from "../../assets/svgs/MapIcon.svg"
import { routes } from "../../routes";

export const HomeHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {userAddresses, addressIndex} = useListControlContext();

  const onClickModal = () => {
    setIsOpen(true);
  }

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
            <Link to={routes.home}>Home</Link>
          </li>
          <li>
            <Link to={routes.orders}>Pedidos</Link>
          </li>
          <li>
            <Link to={routes.favorites}>Favoritos</Link>
          </li>
          {userAddresses[addressIndex] && <li className={styles.userAddress}> 
              <button onClick={onClickModal}><img src={mapIcon} alt="mapIcon" /></button>
            </li>}
        </ul>
        <User />
      </nav>
      <CartModal />
      {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Trocar endereço"> <ModalSwitchAddress/></Modal>}
    </header>
  );
};
