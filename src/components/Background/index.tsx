import { ReactNode } from "react";
import styles from "./styles.module.css";
import { AuthImg } from "../AuthImg";
import { LogoContent } from "../LogoContent";
import { Slogan } from "../Slogan";

interface BackgroundProps {
  image: string;
  children: ReactNode;
  alt: string;
}

export const Background = ({ image, children, alt }: BackgroundProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.leftPanel}>
        <LogoContent />
        <Slogan />
        <AuthImg src={image} alt={alt} />
      </div>
      <div className={styles.rightPanel}>{children}</div>
    </div>
  );
};
