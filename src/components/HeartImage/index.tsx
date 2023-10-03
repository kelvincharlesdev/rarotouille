import styles from "./styles.module.css";
import { desLike, like } from "../../service/apiPuts";
import { useListControlContext } from "../../contexts/ListControlContext";
import { DishType } from "../../types/DishType";

interface HeartImageProps{
    likeImage: string;
    noLikeImage: string;
    likedByMe: boolean;
    setIsLiked: (isLiked: boolean) => void;
    dish: DishType;
}

export const HeartImage = ({likeImage, noLikeImage, likedByMe, dish, setIsLiked}: HeartImageProps) => {
  const {addFavorite, removeFavorite} = useListControlContext();

  const onClickLike = async () => {
    const res = await like(dish.id);
    if(res?.status === 204){
      setIsLiked(true);
      addFavorite(dish);
    }
  };
  const onClickDesLike = async () => {
    const res = await desLike(dish.id);
    if(res?.status === 204){
      setIsLiked(false);
      removeFavorite(dish.id);
    }
  };
    return (<>
        {likedByMe === true ? (
            <button
              className={styles.likeButton}
              type="button"
              onClick={onClickDesLike}
            >
              {" "}
              <img src={likeImage} alt="heartLiked" />{" "}
            </button>
          ) : (
            <button
              className={styles.likeButton}
              type="button"
              onClick={onClickLike}
            >
              {" "}
              <img src={noLikeImage} alt="heartNoLiked" />{" "}
            </button>
          )}
    </>
    );
          }