import styles from "./styles.module.css";

interface DescriptionContentProps{
    description: string
}

export const DescriptionContent = ({description}: DescriptionContentProps) => {
    return (
        <div className={styles.descriptionContent}>
            <p className={styles.descrptionTitle}>Descrição</p>
            <p className={styles.descriptionText}>{description}</p>
        </div>
    );
}