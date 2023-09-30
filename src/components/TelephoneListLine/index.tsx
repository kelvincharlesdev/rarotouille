import { TelephoneType } from "../../types/TelephoneType";
import edit from "../../assets/images/Edit.png"
import styles from "./styles.module.css";
import { useState } from "react";
import { Modal } from "../Modal";
import { PhoneForm } from "../PhoneForm";
interface TelephoneListLineProps {
    phone: TelephoneType;
}

export const TelephoneListLine = ({ phone }: TelephoneListLineProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickModal = () =>{
        setIsOpen(!isOpen);
    }
    return (
        <div className={styles.telephoneContent}>
            <div className={styles.listLine}>
                <p className={styles.phone}>{phone.number}</p>
                <button onClick={onClickModal}><img src={edit} alt="userIcon" /></button>
                {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Editar telefone">
                <PhoneForm id={phone.id} number={phone.number}/>
                </Modal>}
            </div>
        </div>
    );
}