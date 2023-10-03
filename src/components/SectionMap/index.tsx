import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { getChefs } from "../../service/apiGet";
import { IChefResponse, ShowMap } from "../ShowMap";
import styles from "./styles.module.css";

export const SectionMap = () => {
  const { user } = useAuthContext();
  const [chefs, setChefs] = useState<IChefResponse[]>([]);

  const chefsMap = async () => {
    const response = await getChefs();
    if (response) {
      console.log(response.data.data);
      setChefs(response.data.data);
    }
  };

  useEffect(() => {
    chefsMap();
  }, []);

  return (
    <section className={styles.sectionMap}>
      <div className={styles.contentMap}>
        <ShowMap user={user} chefs={chefs} />
      </div>
    </section>
  );
};
