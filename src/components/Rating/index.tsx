import { RatingType } from "../../types/RatingType";
import { RateRatingButton } from "../RateRatingButton";
import { RatingStars } from "../RatingStars";
import styles from "./styles.module.css";
interface RatingProps {
    rating: RatingType
}

export const Rating = ({ rating }: RatingProps) => {
    return (
        <div className={styles.ratingContent}>
            <div className={styles.nameAndStarsContent}>
                <p className={styles.userNameText}>{rating.user_name}</p>
                <RatingStars rate={rating.rate}/>
            </div>
            <p className={styles.commentText}>{rating.comment}</p>
            <section className={styles.ratesButtonsContent}>
                <RateRatingButton dish_id={rating.dish_id} rating_id={rating.id} isLike={true} ratesNumber={rating.likes.length}/>
                <RateRatingButton dish_id={rating.dish_id} rating_id={rating.id} isLike={false} ratesNumber={rating.dislikes.length}/>
            </section>
        </div>
    );
}