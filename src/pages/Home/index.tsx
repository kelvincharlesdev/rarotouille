import { useEffect, useState } from "react";
import { ShowMap } from "../../components/ShowMap";
import { getChefs, getMe } from "../../service/apiGet";

import { UserResponseType } from "../../types/UserResponseType";

import styles from "./styles.module.css";

export const Home = () => {
  const [chefs, setChefs] = useState<UserResponseType[]>([]);
  const [user, setUser] = useState<UserResponseType>();
  useEffect(() => {
    const chefsData = async () => {
      const responseChefs = await getChefs();
      console.log(responseChefs?.data.data);

      if (responseChefs?.data.data) {
        setChefs(responseChefs?.data.data);
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
