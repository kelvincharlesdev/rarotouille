import styles from "./styles.module.css";

interface EmpityListImageProps{
    imageUrl: string
}

export const EmpityListImage = ({imageUrl}: EmpityListImageProps) => {
    return <img src={imageUrl} alt="Empity image" className={styles.imageContent}/>
}