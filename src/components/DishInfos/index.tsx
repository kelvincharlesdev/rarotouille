import { DishType } from "../../types/DishType";
import { SmallAverageContent } from "../SmallAverageContent";
import { HeartImage } from "../HeartImage";
import styles from "./styles.module.css";

//TODO ver se vale a pena por a cidade
interface DishInfosProps{
    dish: DishType;
    likeImage: string;
    noLikeImage: string;
    average: number
}

export const DishInfos = ({dish,likeImage, noLikeImage, average}: DishInfosProps) => {
    return (
    <div className={styles.dishInfosContent}>
        <div className={styles.nameAndAverageAndLikeContent}>
        <p className={styles.dishNameText}>{dish.name}</p>
        <section className={styles.averageAndLikeSection}>
        <SmallAverageContent average={average}/>
        <HeartImage likeImage={likeImage} noLikeImage={noLikeImage} liked_by_me={dish.liked_by_me}/>
        </section>
        </div>
        <div className={styles.categoriesAndCityNameContent}>
        <section className={styles.categoriesNamesSection}>
        {dish.categories.length>1 ? dish.categories.map((category, index)=>(
            <p key={index} className={styles.categoryNameAndCityNameText}>{category.name}</p> 
        )) : (<p className={styles.categoryNameAndCityNameText}>{dish.categories[0].name}</p>) }
        </section>
        {/* <p className={styles.categoryNameAndCityNameText}>{cityName}</p> */}
        <p className={styles.chefNameText}>Chef {dish.chef.name}</p>
        </div>
    </div>
    );
}