import { TelephoneType } from "../../types/TelephoneType";
import edit from "../../assets/images/Edit.png";
import styles from "./styles.module.css";
import { useState } from "react";
import { Modal } from "../Modal";
import { PhoneForm } from "../PhoneForm";
import trashIcon from "../../assets/images/SmallTrash.png";
import { deleteClientTelephone } from "../../service/apiDeletes";
import { useListControlContext } from "../../contexts/ListControlContext";

interface TelephoneListLineProps {
  phone: TelephoneType;
}

export const TelephoneListLine = ({ phone }: TelephoneListLineProps) => {
  const { removePhone } = useListControlContext();
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => {
    setIsOpen(!isOpen);
  };
  const onClickDelete = async () => {
    const res = await deleteClientTelephone(phone.id);
    if (res) {
      removePhone(phone.id);
    }
  };
  return (
    <div className={styles.telephoneContent}>
      <div className={styles.listLine}>
        <p className={styles.phone}>{phone.number}</p>
        <div className={styles.icons}>
          <button onClick={onClickModal}>
            <img src={edit} alt="userIcon" />
          </button>
          <button onClick={onClickDelete}>
            <img className={styles.trash} src={trashIcon} alt="trash" />
          </button>
        </div>
        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Editar telefone">
            <PhoneForm id={phone.id} number={phone.number} />
          </Modal>
        )}
      </div>
    </div>
  );
};
