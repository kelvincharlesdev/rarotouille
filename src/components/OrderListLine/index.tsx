import { OrderResponseType } from "../../types/OrderResponseType";
import { OrderItem } from "../OrderItem";
import styles from "./styles.module.css";
interface OrderListLineProps {
    order: OrderResponseType
}

export const OrderListLine = ({ order }: OrderListLineProps) => {
    let dateStr = ""
    if (order.created_at) {
        dateStr = new Date(order.created_at).toLocaleDateString("pt-BR");

    }
    if (order.items)
        return (
            <div className={styles.orderContent}>
                <div className={styles.orderDishInfos}>
                    <p className={styles.orderTitle}>Pedido</p>
                    {order.items.map((orderItem) => (
                        <OrderItem orderItem={orderItem} key={orderItem.id} />
                    ))}
                    <p className={styles.totalPriceText}>Total: {Number(order.total_price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</p>
                    <p className={styles.dateText}>Data do pedido: {dateStr}</p>
                </div>

                <section className={styles.orderStatus}>
                    <p className={styles.orderTitle}>Status</p>
                    {order.status === "checkout" ? <p className={styles.statusCheckoutText}>{order.status}</p> : (null)}
                    {order.status === "finished" ? <p className={styles.statusPageText}>{order.status}</p> : (null)}
                    {order.status === "canceled" ? <p className={styles.statusCanceledText}>{order.status}</p> : (null)}
                    {order.status === "started" ? <p className={styles.statusStartedText}>{order.status}</p> : (null)}
                </section>
            </div>
        );
}