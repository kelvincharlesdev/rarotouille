import styles from "./styles.module.css";
import Logo from "../../assets/images/Logo.png";
import LogoAcademy from "../../assets/images/RaroAcademey.png";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footerIcons}>
        <a
          href="https://wa.me/+5542999901732"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp size={35} />
        </a>
        <a
          href="https://www.instagram.com/raroacademy/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={35} />
        </a>

        <a href="mailto:rarotouille@gmail.com" aria-label="Email">
          <FaEnvelope size={35} />
        </a>
      </div>

      <div className={styles.logosContainer}>
        <img
          className={styles.logoRarotouille}
          src={Logo}
          alt="Logo Rarotouille"
        />{" "}
        RAROTOUILLE
        <img
          className={styles.logoRaroAcademy}
          src={LogoAcademy}
          alt="Logo Raro Academy"
        />
      </div>
      <p>
        &copy;2023 - Desenvolvido por<span> Grupo 5</span>
      </p>
    </footer>
  );
};
