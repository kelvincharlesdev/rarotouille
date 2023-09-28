import styles from "./styles.module.css";

interface DishImageProps{
    imageUrl: string
}

export const DishImage = ({imageUrl}: DishImageProps) => {
    return <img src={imageUrl} alt="Dish image" className={styles.imageContent}/>
}