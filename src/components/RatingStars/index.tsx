import styles from "./styles.module.css";
import star from "../../assets/svgs/Star.svg"
interface RatingStarsProps {
    rate: number
}

export const RatingStars = ({ rate }: RatingStarsProps) => {

    return (
        <div className={styles.starsContent}>
            {Array.from({ length: rate }).map((_, index) => (
                <img src={star} alt="Star average" key={index} />
            ))}
        </div>
    );
}