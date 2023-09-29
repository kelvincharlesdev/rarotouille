import { DishType } from "../../types/DishType";
import { SmallAverageContent } from "../SmallAverageContent";
import { HeartImage } from "../HeartImage";
import styles from "./styles.module.css";

interface DishInfosProps{
    dish: DishType;
    likeImage: string;
    noLikeImage: string;
    isDishLiked: boolean;
    average: number
}

export const DishInfos = ({dish,likeImage, noLikeImage, average, isDishLiked}: DishInfosProps) => {
    return (
    <div className={styles.dishInfosContent}>
        <div className={styles.nameAndAverageAndLikeContent}>
        <p className={styles.dishNameText}>{dish.name}</p>
        <section className={styles.averageAndLikeSection}>
        <SmallAverageContent average={average}/>
        <HeartImage likeImage={likeImage} noLikeImage={noLikeImage} likedByMe={isDishLiked} dish_id={dish.id} />
        </section>
        </div>
        <div className={styles.categoriesAndCityNameContent}>
        <section className={styles.categoriesNamesSection}>
        {dish.categories.length>1 ? dish.categories.map((category, index)=>(
            <p key={index} className={styles.categoryNameAndCityNameText}>{category.name}</p> 
        )) : (<p className={styles.categoryNameAndCityNameText}>{dish.categories[0].name}</p>) }
        </section>
        <p className={styles.chefNameText}>Chef {dish.chef.name}</p>
        </div>
    </div>
    );
}