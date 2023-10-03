import { AddressResponseType } from "../../types/AddressResponseType";
import edit from "../../assets/images/Edit.png"
import styles from "./styles.module.css";
import { useState } from "react";
import { Modal } from "../Modal";
import { AddressForm } from "../AddressForm";

import trashIcon from "../../assets/images/SmallTrash.png";
import { deleteAddress } from "../../service/apiDeletes";
import { useListControlContext } from "../../contexts/ListControlContext";
interface AddressListLineProps {
    address: AddressResponseType;
}

export const AddressListLine = ({ address }: AddressListLineProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { removeAddress} = useListControlContext();
    const onClickModal = () =>{
        setIsOpen(!isOpen);
    }
    const onClickDelete =async () => {
        const res = await deleteAddress(address.id);
        if(res){
            removeAddress(address.id)
;        }
    }
    return (
        <div className={styles.addressContent}>
            {address.name && <p className={styles.addressName}>{address.name}</p>}
            <div className={styles.listLine}>
            <button onClick={onClickDelete}><img src={trashIcon} alt="trash" /></button>
                <p className={styles.address}>
                    {address.public_place},{" "}
                    {address.number},{" "}
                    {address.neighborhood}
                </p>
                <button onClick={onClickModal}><img src={edit} alt="editIcon" /></button>
            </div>
            {address.complement && <p className={styles.complement}>{address.reference}</p>}
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Editar endereço">
                <AddressForm address={address} id={address.id}/>
                </Modal>}

        </div>
    );
}