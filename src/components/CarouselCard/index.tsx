import styles from "./styles.module.css";
import heartNoLiked from "../../assets/images/HeartNoLiked.svg";
import heartLiked from "../../assets/images/HeartLiked.svg";
import cart from "../../assets/images/Cart.svg";
import { DishType } from "../../types/DishType";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useCartContext } from "../../contexts/CartContext";
import { HeartImage } from "../HeartImage";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export interface CarouselCardProps {
  dish: DishType;
}

export const CarouselCard = ({ dish }: CarouselCardProps) => {
  const {user} = useAuthContext();
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate()
  const { addDishToCart } = useCartContext();
  const onClickDishImage = () => {
    navigate(routes.dishDetails(dish.id));
  };
  const onClickCart = () => {
    addDishToCart(dish);
  };

  const verifyLike = () => {
    const verify = dish.likes?.find((like)=> like.voter_id === user?.id);
    if(verify){
      setIsLiked(true);
    }else{
      setIsLiked(false);
    }
  }
;
  useEffect(()=>{
    verifyLike();
  },[])
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
          <HeartImage setIsLiked={setIsLiked} dish={dish} likeImage={heartLiked} noLikeImage={heartNoLiked} likedByMe={isLiked} />
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
