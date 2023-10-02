import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { AddressResponseType } from "../../types/AddressResponseType";
import { AddressListLine } from "../AddressListLine";
import { TelephoneListLine } from "../TelephoneListLine";
import styles from "./styles.module.css";
import { Modal } from "../Modal";
import { PhoneForm } from "../PhoneForm";
import { AddressForm } from "../AddressForm";
import { useListControlContext } from "../../contexts/ListControlContext";

interface ProfileInfosListProps {
  title: "Telefones" | "Endereços";
}

export const ProfileInfosList = ({title }: ProfileInfosListProps) => {
  const { user } = useAuthContext();
  const {userTelephones, userAddresses} = useListControlContext();
  const [isOpenPhone, setIsOpenPhone] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const onClickModalPhone = () => {
    setIsOpenPhone(!isOpenPhone);
  };
  const onClickModalAddress = () => {
    setIsOpenAddress(!isOpenAddress);
  };

  if (user)
    return (
      <div className={styles.infosContent}>
        <p className={styles.title}>{title} :</p>
        {isOpenPhone && (
          <Modal
            isOpen={isOpenPhone}
            setIsOpen={setIsOpenPhone}
            title="Adicionar telefone"
          >
            <PhoneForm />
          </Modal>
        )}
        {isOpenAddress && (
          <Modal
            isOpen={isOpenAddress}
            setIsOpen={setIsOpenAddress}
            title="Adicionar endereço"
          >
            <AddressForm />
          </Modal>
        )}

        {title === "Telefones" ? (
          <div className={styles.listAndAddButton}>
            <div className={styles.infosList}>
              {userTelephones.map(value => (
                <TelephoneListLine key={value.id} phone={value} />
              ))}
            </div>
            <button className={styles.addButton} onClick={onClickModalPhone}>
              Adicionar
            </button>
          </div>
        ) : (
          <div className={styles.listAndAddButton}>
            <div className={styles.infosList}>
              {userAddresses.map(value => (
                <AddressListLine
                  key={value.id}
                  address={value as AddressResponseType}
                />
              ))}
            </div>
            <button className={styles.addButton} onClick={onClickModalAddress}>
              Adicionar
            </button>
          </div>
        )}
      </div>
    );
  else {
    return <h1>Carregando...</h1>;
  }
};
