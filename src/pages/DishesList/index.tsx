import { useEffect, useRef, useState } from "react";
import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { getDishesPaginated } from "../../service/apiGet";
import { DishType } from "../../types/DishType";
import { SmallCard } from "../../components/SmallCard";
import { InfiniteScroll } from "../../components/InfiniteScroll";

export const DishesList = () => {
  const [dishesList, setDishesList] = useState<DishType[]>([]);
  const [page, setPage] = useState(0);
  //TODO Decidir quantos pratos ira ser mostrado na tela
  const getDishesList = async () => {
    const response = await getDishesPaginated({ page, per_page: 10 });
    console.log(response?.data.data);

    if (response) {
      setDishesList([...dishesList, ...response.data.data]);
    }
  };

  useEffect(() => {
    getDishesList();
  }, [page]);

  const handleInfiniteScroll = () => {
    setPage(oldPage => oldPage + 1);
  };

  return (
    <MainBackground>
      <section className={styles.contentDishesList}>
        <h1 className={styles.title}>Pratos</h1>

        <div className={styles.dishesList}>
          {dishesList.map(dish => (
            <SmallCard key={dish.id} dish={dish} />
          ))}

          <InfiniteScroll callback={handleInfiniteScroll} />
        </div>
      </section>
    </MainBackground>
  );
};
