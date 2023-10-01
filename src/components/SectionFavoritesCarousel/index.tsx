import { useEffect, useState } from "react";
import { DishType } from "../../types/DishType";
import { useAuthContext } from "../../contexts/AuthContext";
import { getDishes } from "../../service/apiGet";
import { Carousel } from "../Carousel";
import { CarouselCard } from "../CarouselCard";
import styles from "./styles.module.css";

export const SectionFavoritesCarousel = () => {
  const [dishesList, setDishesList] = useState<DishType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const getFavoritesDishesList = async () => {
      const response = await getDishes();
      if (response?.status === 200) {
        const copyRes = response.data.data;

        const copyFavorites = copyRes.filter(dish => verifyLike(dish));
        setDishesList(copyFavorites);
        setIsLoading(false);
      }
    };

    const verifyLike = (dish: DishType) => {
      return dish.likes?.some(like => like.voter_id === user?.id);
    };

    getFavoritesDishesList();
  }, [user]);

  return (
    <>
      {isLoading ? (
        //TODO Colocar loading aqui
        <p>Carregando ... </p>
      ) : (
        <section className={styles.sectionDishesClose}>
          <h3>Pratos Favoritos</h3>

          {dishesList.length === 0 ? (
            <p>Escolha seus pratos favoritos.</p>
          ) : (
            <>
              <Carousel>
                {dishesList.map(dish => (
                  <CarouselCard key={dish.id} dish={dish} />
                ))}
              </Carousel>
            </>
          )}
        </section>
      )}
    </>
  );
};
