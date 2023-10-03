import { useEffect, useState } from "react";
import { DishType } from "../../types/DishType";
import { api } from "../../service/api";
import { CarouselCard } from "../CarouselCard";
import { useAuthContext } from "../../contexts/AuthContext";
import { Carousel } from "../Carousel";
import styles from "./styles.module.css";

interface IDishesClose {
  long: number | undefined;
  lat: number | undefined;
  data?: DishType;
}

export const getDishesClose = async ({ lat, long }: IDishesClose) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    try {
      const response = await api.get<DishType[]>("/dishes", {
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        params: {
          lat,
          long
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  return [];
};

export const SectionDishesClose = () => {
  const [dishesList, setDishesList] = useState<DishType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ishasUser, setIsHasUser] = useState<boolean>(false);
  const { user } = useAuthContext();

  const hasUser = user && user.addresses && user.addresses.length > 0;
  const userLatitude = hasUser ? user.addresses[0].latitude : undefined;
  const userLongitude = hasUser ? user.addresses[0].longitude : undefined;

  const DishesClose = async () => {
    if (hasUser) {
      const response = await getDishesClose({
        lat: userLatitude,
        long: userLongitude
      });

      if (response) {
        setDishesList([...response.data]);
      }
      setIsLoading(false);

      setIsHasUser(true);
    }

    if (user) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    DishesClose();
  }, [hasUser]);

  return (
    <>
      {isLoading ? (
        //TODO Colocar loading aqui
        <p>Carregando ... </p>
      ) : (
        <section className={styles.sectionDishesClose}>
          <h3>Pratos proximos</h3>

          {!ishasUser ? (
            <p>Por favor, forneça um endereço para ver os pratos próximos.</p>
          ) : (
            <Carousel>
              {dishesList.map(dish => (
                <CarouselCard key={dish.id} dish={dish} />
              ))}
            </Carousel>
          )}
        </section>
      )}
    </>
  );
};
