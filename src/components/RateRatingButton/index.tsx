import styles from "./styles.module.css";
import likeImage from "../../assets/images/LikeRate.png"
import desLikeImage from "../../assets/images/DesLikeRating.png"
import likeImageClicked from "../../assets/images/LikeRatingClicked.png"
import desLikeImageClicked from "../../assets/images/DeslikeRatingClicked.png"


import { desLikeRating, likeRating } from "../../service/apiPuts";
import { useState } from "react";


interface RateRatingButtonProps {
    likesNumber: number;
    desLikesNumber: number;
    dish_id: string;
    rating_id: string;
    likedByMe: boolean;
    desLikedByMe: boolean;
    setLikedByMe:(likedByMe:boolean) => void
    setDesLikedByMe:(likedByMe:boolean) => void

}

//TODO ver essa questão do estado inicial

export const RateRatingButton = ({ likesNumber,desLikesNumber, dish_id, rating_id, likedByMe, desLikedByMe, setLikedByMe, setDesLikedByMe }: RateRatingButtonProps) => {
    const [likesNumberController, setLikesNumberController] = useState(likesNumber);
    const [desLikesNumberController, setDeslikesNumberController] = useState(desLikesNumber);
  
    const onClickLike = async () => {
        if(desLikedByMe){
            if(desLikesNumberController >0){
                setDeslikesNumberController((prev) => prev - 1);

            }
            setDesLikedByMe(!desLikedByMe)
        }
        if(likedByMe){
            const res = await likeRating(dish_id, rating_id);
            if(res?.status === 204){
                if(likesNumberController >0){
                setLikesNumberController((prev) => prev - 1);
                }
                setLikedByMe(!likedByMe)
            }
        }else{
            const res = await likeRating(dish_id, rating_id);
            if(res?.status === 204){
                setLikesNumberController((prev) => prev + 1);
                setLikedByMe(!likedByMe)
            }
        }
    };
    const onClickDesLike = async () => {
        if(likedByMe){
            if(likesNumberController >0){
                setLikesNumberController((prev) => prev - 1);
            }
            setLikedByMe(!likedByMe)
         }
        if(desLikedByMe){
            const res = await desLikeRating(dish_id, rating_id);
            if(res?.status === 204){
                if(desLikesNumberController >0){
                    setDeslikesNumberController((prev) => prev - 1);
                }
                setDesLikedByMe(!desLikedByMe)
            }
        }else{
            const res = await desLikeRating(dish_id, rating_id);
            if(res?.status === 204){
                setDeslikesNumberController((prev) => prev + 1);
                setDesLikedByMe(!desLikedByMe)
            }
        }
    };

        return (
            <div className={styles.rateRatingContent}>
                    <section className={styles.numberAndImageSection}>
                    <p>{likesNumberController.toString()}</p>
                    {likedByMe === true ? (
                        <button onClick={onClickDesLike}><img src={likeImageClicked} alt="likeClicked" /></button>
                    ) : (
                        <button onClick={onClickLike}><img src={likeImage} alt="like" /></button>
                    )}
                    </section>
                    <section className={styles.numberAndImageSection}>
                        <p>{desLikesNumberController.toString()}</p>
                {desLikedByMe === true ? (
                    <button onClick={onClickLike}><img src={desLikeImageClicked} alt="deslikeClicked" /></button>
                    ) : (
                        <button onClick={onClickDesLike}><img src={desLikeImage} alt="deslike" /></button>
                        )}
                    </section>
                        
            </div>
        );
}