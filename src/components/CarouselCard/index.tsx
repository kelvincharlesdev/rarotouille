import styles from "./styles.module.css";
import heartNoLiked from "../../assets/images/HeartNoLiked.svg";
import heartLiked from "../../assets/images/HeartLiked.svg";
import cart from "../../assets/images/Cart.svg";
import { DishType } from "../../types/DishType";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useCartContext } from "../../contexts/CartContext";
import { desLike, like } from "../../service/apiPuts";

export interface CarouselCardProps {
  dish: DishType;
}

export const CarouselCard = ({ dish }: CarouselCardProps) => {
  const navigate = useNavigate();
  const { addDishToCart } = useCartContext();
  const priceFormated = dish.unit_price.replace(".", ",");
  const onClickDishImage = () => {
    navigate(routes.dishDetails(dish.id));
  };
  const onClickLike = async () => {
    await like(dish.id);
  };
  const onClickDesLike = async () => {
    await desLike(dish.id);
  };
  const onClickCart = () => {
    addDishToCart(dish);
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
