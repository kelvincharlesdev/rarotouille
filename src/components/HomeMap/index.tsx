import { useEffect, useState } from "react";
import { IChefResponse, ShowMap } from "../../components/ShowMap";
import { getChefs, getMe } from "../../service/apiGet";

import { UserResponseType } from "../../types/UserResponseType";

import styles from "./styles.module.css";

export const HomeMap = () => {
  const [chefs, setChefs] = useState<IChefResponse[]>([]);
  const [user, setUser] = useState<UserResponseType>();
  useEffect(() => {
    const chefsData = async () => {
      const responseChefs = await getChefs();
      console.log(responseChefs?.data);

      if (responseChefs?.data) {
        setChefs(responseChefs?.data);
      }

      const responseMe = await getMe();
      console.log(responseMe?.data);

      if (responseMe) {
        setUser(responseMe?.data);
      }

      console.log(user);

      getMe;
    };
    chefsData();
  }, []);
  return (
    <div className={styles.content}>
      <ShowMap chefs={chefs} user={user} />
    </div>
  );
};
