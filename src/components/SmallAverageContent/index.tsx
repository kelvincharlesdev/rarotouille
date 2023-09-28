import styles from "./styles.module.css";
import star from "../../assets/svgs/Star.svg"
interface SmallAverageContentProps{
    average: number
}

export const SmallAverageContent = ({average}: SmallAverageContentProps) => {
    let averageText = "";
    if(Number.isInteger(average)){
         averageText = average.toString() + ","+ "0"
    }else{
        averageText = average.toFixed(1).toString().replace(".",",");
        
    }
    return (
        <div className={styles.averageContent}>
            <p className={styles.averageText}>{averageText}</p>
            <img src={star} alt="Star average" />
        </div>
    );
}