import styles from "./styles.module.css";
import star from "../../assets/images/BigStar.png"
interface AverageContentProps{
    average: number
}

export const AverageContent = ({average}: AverageContentProps) => {
    let averageText = "";
    if(Number.isInteger(average)){
         averageText = average.toString() + ","+ "0"
    }else{
        averageText = average.toFixed(1).toString().replace(".",",");
        
    }
    return (
        <div className={styles.averageContent}>
            <p className={styles.averageTitle}>Média das avaliações</p>
            <div className={styles.averageAndStarsContent}>
            <p className={styles.averageText}>{averageText}</p>
            <img src={star} alt="Star average" />
            </div>
        </div>
    );
}