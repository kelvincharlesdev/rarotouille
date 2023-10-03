import { useEffect, useState } from "react";
import { RatingType } from "../../types/RatingType";
import { RateRatingButton } from "../RateRatingButton";
import { RatingStars } from "../RatingStars";
import styles from "./styles.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
interface RatingProps {
    rating: RatingType
}

export const Rating = ({ rating }: RatingProps) => {
    const [likedByMe, setLikedByMe] = useState<boolean>(false);
    const [desLikedByMe, setDesLikedByMe] = useState<boolean>(false);
    const {user} = useAuthContext();

    const verifyRating = () => {
        const verifyLike = rating.likes.filter((like) => {
            return like.voter_id === user?.id;
        });
        const verifyDesLike = rating.dislikes.filter((desLike) => {
            return desLike.voter_id === user?.id
        });
        if(verifyLike.length>0){
            setLikedByMe(true);
        }

        if(verifyDesLike.length>0){
            setDesLikedByMe(true)
        }
    }
    useEffect(()=>{
       verifyRating();
    },[])
    return (
        <div className={styles.ratingContent}>
            <div className={styles.nameAndStarsContent}>
                <p className={styles.userNameText}>{rating.user_name}</p>
                <RatingStars rate={rating.rate}/>
            </div>
            <p className={styles.commentText}>{rating.comment}</p>
            {user?.id !== rating.user_id ? (<section className={styles.ratesButtonsContent}>
                <RateRatingButton dish_id={rating.dish_id} rating_id={rating.id} likesNumber={rating.likes.length} desLikesNumber={rating.dislikes.length} desLikedByMe={desLikedByMe} likedByMe={likedByMe} setLikedByMe={setLikedByMe} setDesLikedByMe={setDesLikedByMe}/>
            </section>) : (null)}
        </div>
    );
}