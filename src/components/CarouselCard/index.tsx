import styles from "./styles.module.css";
import heartNoLiked from "../../assets/images/HeartNoLiked.svg";
import heartLiked from "../../assets/images/HeartLiked.svg";
import cart from "../../assets/images/Cart.svg";
import { DishType } from "../../types/DishType";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { like } from "../../service/apiPosts";
import { desLike } from "../../service/apiDeletes";
import { useState } from "react";

export interface CarouselCardProps {
  dish: DishType;
}

export const CarouselCard = ({ dish }: CarouselCardProps) => {
  const navigate = useNavigate();
  const [likeId, setLikeId] = useState();
  const priceFormated = dish.unit_price.replace(".", ",");
  const onClickDishImage = () => {
    navigate(routes.dishDetails(dish.id));
  };
  const onClickLike = async () => {
    const res = await like({ likeable_id: dish.id });
    if (res) {
      //TODO consertar quando a api ajeitar o like
      setLikeId(res.data);
    }
  };
  const onClickDesLike = () => {
    //TODO consertar quando a api ajeitar o like
    desLike("likeId");
  };
  const onClickCart = () => {
    //TODO quando fizer o carrinho
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageNamePriceContent}>
        <button
          className={styles.dishImageButton}
          type="button"
          onClick={onClickDishImage}
        >
          <img
            src={dish.images[0]}
            alt="dishImg"
            className={styles.dishImage}
          />
        </button>
        <div className={styles.dishNamePrice}>
          <p className={styles.dishName}>{dish.name}</p>
          <p className={styles.dishPrice}>R$ {priceFormated}</p>
        </div>
      </div>
      <div className={styles.chefHeartCartContent}>
        <div className={styles.chefHeart}>
          <p className={styles.chefName}>Chef {dish.chef?.name}</p>
          {dish.liked_by_me ? (
            <button
              className={styles.likeButton}
              type="button"
              onClick={onClickDesLike}
            >
              {" "}
              <img src={heartLiked} alt="heartLiked" />{" "}
            </button>
          ) : (
            <button
              className={styles.likeButton}
              type="button"
              onClick={onClickLike}
            >
              {" "}
              <img src={heartNoLiked} alt="heartNoLiked" />{" "}
            </button>
          )}
        </div>
        <button
          className={styles.cartButton}
          type="button"
          onClick={onClickCart}
        >
          <img className={styles.cartIcon} src={cart} alt="marketCart" />
        </button>
      </div>
    </div>
  );
};
