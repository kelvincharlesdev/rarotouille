import { HomeSlogan } from "../../components/HomeSlogan";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { SectionDishesClose } from "../../components/SectionDishesClose";
import { HomeDishes } from "../../components/HomeDishes";
import { SectionFavoritesCarousel } from "../../components/SectionFavoritesCarousel";

export const Home = () => {
  return (
    <MainBackground>
      <div className={styles.teste}>
        <HomeSlogan />

        <SectionDishesClose />
        <SectionFavoritesCarousel />

        <HomeDishes />
      </div>
    </MainBackground>
  );
};
