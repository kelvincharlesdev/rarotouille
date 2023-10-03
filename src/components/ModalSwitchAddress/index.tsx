import { useListControlContext } from "../../contexts/ListControlContext"
import { AddressOption } from "../AddressOption";
import styles from "./styles.module.css";

export const ModalSwitchAddress = () => {
    const {userAddresses} = useListControlContext();

    if(userAddresses){
        return(<div className={styles.addressesContent}>
            {userAddresses.map((address, index)=>(
                <AddressOption address={address} index={index} key={address.id}/>
            ))}
        </div>
        );
    }
}