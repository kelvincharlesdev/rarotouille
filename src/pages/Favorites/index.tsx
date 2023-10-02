import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { SmallCard } from "../../components/SmallCard";
import clocheEmpity from "../../assets/images/ClocheEmpity.png"
import { EmpityListImage } from "../../components/EmpityListImage";
import { useListControlContext } from "../../contexts/ListControlContext";

export const Favorites = () => {
  const {favoritesDishes} = useListControlContext();
  console.log(favoritesDishes)


  return (
    <MainBackground> 
      <section className={styles.contentDishesList}>
        <h1 className={styles.title}>Favoritos</h1>
        {favoritesDishes.length === 0 ? (
          <div className={styles.empityBoxContent}>
            <p className={styles.empityBoxTitle}>Sem pratos favoritos</p>
            <EmpityListImage imageUrl={clocheEmpity}/>
          </div>
        ) : (
        <div className={styles.dishesList}>
          {favoritesDishes.map(dish => (
            <SmallCard key={dish.id} dish={dish} />
          ))}
        </div>

        )}
      </section>
    </MainBackground>
  );
};
