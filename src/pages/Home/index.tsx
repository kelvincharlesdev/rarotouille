import { HomeSlogan } from "../../components/HomeSlogan";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { SectionDishesClose } from "../../components/SectionDishesClose";
import { HomeDishes } from "../../components/HomeDishes";

export const Home = () => {
  return (
    <MainBackground>
      <div className={styles.teste}>
        <HomeSlogan />

        <SectionDishesClose />

        <HomeDishes />
      </div>
    </MainBackground>
  );
};
