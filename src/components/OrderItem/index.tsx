import { OrderItemResponseType } from "../../types/OrderItemResponseType";
import styles from "./styles.module.css";
import clocheOrder from "../../assets/images/ClocheOrder.png"

interface OrderItemProps {
    orderItem: OrderItemResponseType;
}

export const OrderItem = ({ orderItem }: OrderItemProps) => {

    return (
        <div className={styles.orderDishContent}>
            <div className={styles.imageAndDishInfosContent}>
                <img src={clocheOrder} alt="clocheOrder" />
                <div className={styles.dishInfosAndDateContent}>
                    <section className={styles.dishInfosContent}>
                        <p className={styles.dishName}>{orderItem.dish?.name}</p>
                        <p className={styles.textPrimary}>{Number(orderItem.dish?.unit_price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <p className={styles.dishAmount}>Qunatidade: {orderItem.amount.toString()}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}  