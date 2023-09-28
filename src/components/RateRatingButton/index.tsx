import styles from "./styles.module.css";
import likeImage from "../../assets/images/LikeRate.png"
import desLikeImage from "../../assets/images/DesLikeRating.png"
import { desLikeRating, likeRating } from "../../service/apiPuts";


interface RateRatingButtonProps {
    ratesNumber: number;
    isLike: boolean;
    dish_id: string;
    rating_id: string;
    
}



export const RateRatingButton = ({ ratesNumber, isLike, dish_id, rating_id }: RateRatingButtonProps) => {
    //TODO quando colocar o user no contexto, verificar se o user_id é igual ao do rating, pra não deixar ele dá laike ou deslike no próprio comentário
    const onClickLike = async () => {
        await likeRating(dish_id,rating_id);
      };
      const onClickDesLike = async () => {
        await desLikeRating(dish_id,rating_id);
      };

    return (
        <div className={styles.rateRatingContent}>
            {isLike ? <>
                <p>{ratesNumber.toString()}</p>
            <button onClick={onClickDesLike}><img src={likeImage} alt="likeRaingImage" /></button>
            </> : <><p>{ratesNumber.toString()}</p>
            <button onClick={onClickLike}><img src={desLikeImage} alt="desLikeRaingImage" /></button></>}
        </div>
    );
}