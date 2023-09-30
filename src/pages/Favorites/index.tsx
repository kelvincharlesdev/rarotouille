import { useEffect, useState } from "react";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { getDishes } from "../../service/apiGet";
import { DishType } from "../../types/DishType";
import { SmallCard } from "../../components/SmallCard";
import { useAuthContext } from "../../contexts/AuthContext";
import clocheEmpity from "../../assets/images/ClocheEmpity.png"
import { EmpityListImage } from "../../components/EmpityListImage";

export const Favorites = () => {
  const [dishesList, setDishesList] = useState<DishType[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const {user} = useAuthContext();

  const getFavoritesDishesList = async () => {
    const response = await getDishes();
    if (response) {
      const copyFavorites = response.data.data.filter((dish)=> verifyLike(dish));
      setDishesList(copyFavorites);
      setIsLoading(false)
    }
  };

  const verifyLike = (dish: DishType) => {
    const verify = dish.likes?.find((like)=> like.voter_id === user?.id);
    if(verify){
      
      return true;
    }else{
      return false;
    }
  }

  useEffect(() => {
    getFavoritesDishesList();
  }, []);


  return (
    <MainBackground> 
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : ( 
       
      <section className={styles.contentDishesList}>
        <h1 className={styles.title}>Favoritos</h1>
        {dishesList.length === 0 ? (
          <div className={styles.empityBoxContent}>
            <p className={styles.empityBoxTitle}>Sem pratos favoritos</p>
            <EmpityListImage imageUrl={clocheEmpity}/>
          </div>
        ) : (
        <div className={styles.dishesList}>
          {dishesList.map(dish => (
            <SmallCard key={dish.id} dish={dish} />
          ))}
        </div>

        )}
      </section>
      )}
    </MainBackground>
  );
};
