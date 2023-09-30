import { useState } from "react";
import styles from "./styles.module.css";
import { desLike, like } from "../../service/apiPuts";

interface HeartImageProps{
    likeImage: string;
    noLikeImage: string;
    likedByMe: boolean;
    setIsLiked: (isLiked: boolean) => void;
    dish_id: string;
}

export const HeartImage = ({likeImage, noLikeImage, likedByMe, dish_id, setIsLiked}: HeartImageProps) => {
  const onClickLike = async () => {
    const res = await like(dish_id);
    if(res?.status === 204){
      setIsLiked(!likedByMe)
    }
  };
  const onClickDesLike = async () => {
    const res = await desLike(dish_id);
    if(res?.status === 204){
      setIsLiked(!likedByMe)
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