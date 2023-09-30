import { useEffect, useState } from "react";
import { getOrder, getOrders } from "../../service/apiGet";
import { MainBackground } from "../../components/MainBackground";
import { OrderResponseType } from "../../types/OrderResponseType";
import empityBox from "../../assets/images/BoxEmpity.png"
import styles from "./styles.module.css";
import { EmpityListImage } from "../../components/EmpityListImage";
import { OrderListLine } from "../../components/OrderListLine";

export const Orders = () => {
  const [userLastOrders, setUserLastOrders] = useState<OrderResponseType[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const getUserOrders = async () => {
    const res = await getOrders();
    if (res) {
      if (res.data.data.length === 0) {
        setIsLoading(false);
      }
      if (res.data.data.length > 5) {
        const lastFive = res.data.data.slice(res.data.data.length - 5);
        const copyLastOrders = [{} as OrderResponseType];
        for (let i = 0; i < 5; i++) {
          const response = await getUniqueOrder(lastFive[i].id);
          if (response)
            copyLastOrders.push(response);
        }
        setUserLastOrders(copyLastOrders);
        setIsLoading(false);
      } else {
        const lastFive = res.data.data;;
        const copyLastOrders = [{} as OrderResponseType];
        for (let i = 0; i < res.data.data.length; i++) {
          const response = await getUniqueOrder(lastFive[i].id);
          if (response)
            copyLastOrders.push(response);
        }
        setUserLastOrders(copyLastOrders);
        setIsLoading(false);
      }
    }
  }
  const getUniqueOrder = async (order_id: string) => {
    const res = await getOrder(order_id);
    if (res) {
      const response = res.data;
      return response;
    }
  }

  useEffect(() => {
    getUserOrders();
  }, [])

  return (
    <MainBackground>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <div className={styles.orderListContent}>
          <h1 className={styles.title}>Seus pedidos</h1>
          {userLastOrders.length !== 0 ? (
            <div className={styles.ordersList}>
              {userLastOrders.map((order) => (
                <OrderListLine order={order} />
              ))}
            </div>

          ) : (
            <div className={styles.empityBoxContent}>
              <p className={styles.empityBoxTitle}>Sem pedidos realizados</p>
              <EmpityListImage imageUrl={empityBox} />
            </div>
          )}
        </div>
      )}

    </MainBackground>

  );
};
