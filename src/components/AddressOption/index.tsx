import { AddressResponseType } from "../../types/AddressResponseType";
import chefHat from "../../assets/images/LitleChefHat.png"
import styles from "./styles.module.css";
import { useListControlContext } from "../../contexts/ListControlContext";

interface AddressOptionProps{
    address: AddressResponseType;
    index: number;
}

export const AddressOption = ({address, index}: AddressOptionProps) => {
    const {addressIndex, switchAddressIndex} = useListControlContext();
    const onClickButton = () =>{
        switchAddressIndex(index)
    }
    return(

    <div className={styles.addressContent}>
        {addressIndex === index ? <img src={chefHat} alt="chefHat"/> : null}
        <button onClick={onClickButton}>
            {address.public_place}, {address.number}, {address.neighborhood}
        </button>
    </div>

    );
}