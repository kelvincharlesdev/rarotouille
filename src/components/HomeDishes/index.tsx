import { useEffect, useState } from "react";
import { getDishes } from "../../service/apiGet";
import { DishType } from "../../types/DishType";
import styles from "./styles.module.css";
import { SmallCard } from "../SmallCard";
import { Link } from "react-router-dom";

export const HomeDishes = () => {
  const [dish, setDish] = useState<DishType[]>([]);
  const dishes = async () => {
    const res = await getDishes();
    console.log("Pratinhos", res);

    if (res) {
      setDish(res.data.data.slice(0, 10));
    }
  };
  useEffect(() => {
    dishes();
  }, []);

  return (
    <>
      <div className={styles.dishContainer}>
        <div className={styles.linkContainer}>
          <h3>Outros Pratos</h3>
          <Link to="/disheslist" className={styles.link}>
            Ver Todos
          </Link>
        </div>
        <div className={styles.dishRow}>
          {dish.slice(0, 5).map(d => (
            <SmallCard dish={d} key={d.id} />
          ))}
        </div>
        <div className={styles.dishRow}>
          {dish.slice(5, 10).map(d => (
            <SmallCard dish={d} key={d.id} />
          ))}
        </div>
      </div>
    </>
  );
};
