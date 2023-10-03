import { useEffect } from "react"
import { useCartContext } from "../../contexts/CartContext"
import { useParams } from "react-router-dom";
import { CheckAnimation } from "../../components/CheckAnimation";
import styles from "./styles.module.css";

export const PayQrCode = () => {
    const {id} = useParams();
    const {payFinalOrder} = useCartContext();
    useEffect(()=>{
        if(id)
        payFinalOrder(id);
    },[])
    return(
        <div className={styles.container}>
            <section >
            <CheckAnimation/>
            <h1>Pagamento efetuado!</h1>
            </section>
        </div>
    );
}