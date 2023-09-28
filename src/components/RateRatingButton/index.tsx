import styles from "./styles.module.css";
import likeImage from "../../assets/images/LikeRate.png"
import desLikeImage from "../../assets/images/DesLikeRating.png"


interface RateRatingButtonProps {
    ratesNumber: number;
    isLike: boolean;
    dish_id: string;
    rating_id: string;
    
}


//TODO colocar as requisições de like e deslike
export const RateRatingButton = ({ ratesNumber, isLike, dish_id, rating_id }: RateRatingButtonProps) => {
    return (
        <div className={styles.rateRatingContent}>
            {isLike ? <>
                <p>{ratesNumber.toString()}</p>
            <button onClick={()=> console.log("Like")}><img src={likeImage} alt="likeRaingImage" /></button>
            </> : <><p>{ratesNumber.toString()}</p>
            <button onClick={()=> console.log("DesLike")}><img src={desLikeImage} alt="desLikeRaingImage" /></button></>}
        </div>
    );
}