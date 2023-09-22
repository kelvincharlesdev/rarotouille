import { ReactNode } from "react";
import styles from "./styles.module.css";
import { AuthImg } from "../AuthImg";

interface BackgroundProps {
  image: string;
  children: ReactNode;
}

export const Background = ({ image, children }: BackgroundProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.leftPanel}>
        {/*<Logo />  Logo Rarotuile */}
        <div className={styles.ImageContainer}>
          {/*<AuthParagraph/> Paragráfo embaixo da logo */}
          <AuthImg src={image} alt="Imagem de Fundo" />
        </div>
      </div>
      <div className={styles.rightPanel}>{children}</div>
    </div>
  );
};
