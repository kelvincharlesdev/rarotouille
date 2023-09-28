import { HomeSlogan } from "../../components/HomeSlogan";
import { MainBackground } from "../../components/MainBackground";
import { HomeDishes } from "../../components/HomeDishes";

export const Home = () => {
  return (
    <MainBackground>
      <HomeSlogan />
      <HomeDishes />
    </MainBackground>
  );
};
