import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./styles.module.css";
import userIcon from "../../assets/images/UserIcon.png";
import edit from "../../assets/images/Edit.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { useState } from "react";
import { Modal } from "../Modal";
import { UserForm } from "../UserForm";

export const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => {
    console.log("to aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

    setIsOpen(!isOpen);
  };
  let dateStr = "";
  if (user?.created_at) {
    dateStr = new Date(user?.created_at).toLocaleDateString("pt-BR");
  }

  if (user)
    return (
      <div className={styles.sidebarContent}>
        <div className={styles.infosAndOtherPages}>
          <div className={styles.imageAndName}>
            <img src={userIcon} alt="userIcon" />
            <section className={styles.nameSection}>
              <p className={styles.userName}>{user?.name}</p>
              <button onClick={onClickModal}>
                <img src={edit} alt="editIcon" />
              </button>
            </section>
          </div>
          {isOpen && (
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Editar dados">
              <UserForm user={user} />
            </Modal>
          )}

          <section className={styles.dateSection}>
            <p className={styles.dateTitile}>Tá com a gente desde:</p>
            <p className={styles.date}>{dateStr}</p>
          </section>

          <button
            className={styles.pageLinksButtons}
            onClick={() => navigate(routes.orders(user.id))}
          >
            Seus pedidos
          </button>
          <button
            className={styles.pageLinksButtons}
            onClick={() => navigate(routes.favorites(user.id))}
          >
            Favoritos
          </button>
        </div>
      </div>
    );
  else {
    return <h1>Carregando...</h1>;
  }
};
