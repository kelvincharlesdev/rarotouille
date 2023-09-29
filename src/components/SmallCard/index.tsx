import styles from "./styles.module.css";
import heartNoLiked from "../../assets/images/HeartNoLiked.svg";
import heartLiked from "../../assets/images/HeartLiked.svg";
import cart from "../../assets/images/Cart.svg";
import { DishType } from "../../types/DishType";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useCartContext } from "../../contexts/CartContext";
import { HeartImage } from "../HeartImage";

export interface SmallCardProps {
  dish: DishType;
}

export const SmallCard = ({ dish }: SmallCardProps) => {
  const navigate = useNavigate();
  const onClickDishImage = () => {
    navigate(routes.dishDetails(dish.id));
  };
  const {addDishToCart} = useCartContext();
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
          <p className={styles.dishPrice}>{Number(dish.unit_price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}</p>
        </div>
      </div>
      <div className={styles.chefHeartCartContent}>
        <div className={styles.chefHeart}>
          <p className={styles.chefName}>Chef {dish.chef?.name}</p>
          <HeartImage dish_id={dish.id} likeImage={heartLiked} noLikeImage={heartNoLiked} likedByMe={dish.liked_by_me}/>
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
