import { ReactNode } from "react";
import styles from "./styles.module.css";
import { HomeHeader } from "../HomeHeader";
import { Footer } from "../Footer";

interface MainBackgroundProps {
  children: ReactNode;
}

export const MainBackground = ({ children }: MainBackgroundProps) => {
  return (
    <>
      <HomeHeader />
      <div className={styles.content}>{children}</div>
      {/* <Footer /> */}
    </>
  );
};
