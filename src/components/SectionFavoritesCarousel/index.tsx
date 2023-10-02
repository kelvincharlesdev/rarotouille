import { Carousel } from "../Carousel";
import { CarouselCard } from "../CarouselCard";
import styles from "./styles.module.css";
import { useListControlContext } from "../../contexts/ListControlContext";

export const SectionFavoritesCarousel = () => {
  const {favoritesDishes} = useListControlContext();

  return (
    <>
        <section className={styles.sectionDishesClose}>
          <h3>Pratos Favoritos</h3>

          {favoritesDishes.length === 0 ? (
            <p>Escolha seus pratos favoritos.</p>
          ) : (
            <>
              <Carousel>
                {favoritesDishes.map(dish => (
                  <CarouselCard key={dish.id} dish={dish} />
                ))}
              </Carousel>
            </>
          )}
        </section>
    </>
  );
};
