import { useState } from "react";
import styles from "./styles.module.css";
import { desLike, like } from "../../service/apiPuts";

interface HeartImageProps{
    likeImage: string;
    noLikeImage: string;
    likedByMe: boolean;
    dish_id: string;
}

export const HeartImage = ({likeImage, noLikeImage, likedByMe, dish_id}: HeartImageProps) => {
  const [liked, setLiked] = useState(likedByMe);
  const onClickLike = async () => {
    const res = await like(dish_id);
    if(res?.status === 204){
      setLiked(!liked)
    }
  };
  const onClickDesLike = async () => {
    const res = await desLike(dish_id);
    if(res?.status === 204){
      setLiked(!liked)
    }
  };
    return (<>
        {liked === true ? (
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