import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChef, getChefDishes, getDish } from "../../service/apiGet";
import { DishType } from "../../types/DishType";
import { DishImage } from "../../components/DishImage";
import heartNoLiked from "../../assets/svgs/HeartNoLikedBig.svg";
import heartLiked from "../../assets/svgs/HeartLikedBig.svg";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { DishInfos } from "../../components/DishInfos";
import { DescriptionContent } from "../../components/DescriptionContent";
import { IChefResponse } from "../../components/ShowMap";
import { Carousel } from "../../components/Carousel";
import { Rating } from "../../components/Rating";
import { AverageContent } from "../../components/AvaregeContent";
import { ButtonAddToCart } from "../../components/ButtonAddToCart";
import { useCartContext } from "../../contexts/CartContext";
import { SmallCard } from "../../components/SmallCard";
import { ShowMapChef } from "../../components/ShowMapChef";
import { useAuthContext } from "../../contexts/AuthContext";

export const DishDetails = () => {
  const [dish, setDish] = useState<DishType>({} as DishType);
  const [chef, setChef] = useState<IChefResponse>({} as IChefResponse);
  const [otherChefDishes, setOtherChefDishes] = useState<DishType[]>([]);
  const [isDishLiked, setIsDishLiked] = useState(false);
  const [averageValue, setAverageValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { addDishToCart } = useCartContext();

  const { id } = useParams();
  const { user } = useAuthContext();

  const verifyLike = (dish: DishType) => {
    const verify = dish.likes?.find(like => like.voter_id === user?.id);
    if (verify) {
      return true;
    } else {
      return false;
    }
  };
  const getDishIndividual = async () => {
    if (id) {
      const res = await getDish(id);
      if (res) {
        setDish(res.data);
        setIsDishLiked(res.data.liked_by_me);
        calculateAverageValue(res.data);
        const resChef = await getChef(res.data.chef_id);
        if (resChef) {
          setChef(resChef.data);
          const resOtherDishes = await getChefDishes(res.data.chef_id);
          if (resOtherDishes) {
            const copyOtherDishes = [...resOtherDishes.data.data];
            const OtherDishes = copyOtherDishes.filter(
              dishChef => dishChef.id !== res.data.id
            );
            setOtherChefDishes(OtherDishes);
            if (user) {
              setIsLoading(true);
            }
          }
        }
      }
    }
  };
  const calculateAverageValue = async (dish: DishType) => {
    if (dish.ratings.length > 0) {
      const copyDish = dish.ratings;
      const rates = copyDish
        .map(rating => {
          return rating.rate;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if (rates && copyDish) {
        const average = rates / copyDish?.length;
        setAverageValue(average);
      }
    } else {
      setAverageValue(0);
    }
  };

  useEffect(() => {
    getDishIndividual();
    setIsDishLiked(() => verifyLike(dish));
    console.log(isDishLiked);
  }, [id]);

  //TODO ver o like e deslike
  return (
    <>
      <MainBackground>
        {isLoading && user ? (
          <div className={styles.mainContainer}>
            <div className={styles.infosAndDescriptionContent}>
              <div className={styles.imageAndDishInfosContent}>
                <DishImage imageUrl={dish.images[0]} />

                <div className={styles.dishInfosContent}>
                  <DishInfos
                    setIsDishLiked={setIsDishLiked}
                    dish={dish}
                    average={averageValue}
                    likeImage={heartLiked}
                    noLikeImage={heartNoLiked}
                    isDishLiked={isDishLiked}
                  />
                  <ButtonAddToCart
                    text="Adicionar ao carrinho"
                    onClick={() => addDishToCart(dish)}
                  />
                </div>
              </div>
              <DescriptionContent description={dish.description} />
            </div>
            <div className={styles.mapContent}>
              <p className={styles.contentTitles}>Tão perto ...</p>
              <ShowMapChef user={user} chef={chef} />
            </div>
            <div>
              <p className={styles.contentTitles}>
                Outros pratos do &#40;a&#41; chef {chef.name}
              </p>
              <div>
                <Carousel>
                  {otherChefDishes.map(otherChefDish => (
                    <SmallCard dish={otherChefDish} key={otherChefDish.id} />
                  ))}
                </Carousel>
              </div>
            </div>
            <div className={styles.ratingsAndAverageContent}>
              <div className={styles.ratingsContent}>
                <p className={styles.contentTitles}>
                  Veja o que a galera está falando
                </p>
                {dish.ratings.length > 0 ? (
                  <>
                    {dish.ratings.map(rating => (
                      <Rating rating={rating} key={rating.id} />
                    ))}
                  </>
                ) : (
                  <p>Sem avaliações</p>
                )}
              </div>
              <AverageContent average={averageValue} />
            </div>
          </div>
        ) : (
          <h1>Carregando...</h1>
        )}
      </MainBackground>
    </>
  );
};
