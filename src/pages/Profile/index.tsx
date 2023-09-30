import { MainBackground } from "../../components/MainBackground";
import styles from "./styles.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { ProfileSidebar } from "../../components/ProfileSidebar";
import { ProfileInfosList } from "../../components/ProfileInfosList";
export const Profile = () => {
  const {user} = useAuthContext();


  if(user){
    return (
      <MainBackground> 
        <div className={styles.profileContent}>
       <ProfileSidebar/>
       <div className={styles.infosListContent}>
        <h1 className={styles.title}>Seus dados:</h1>
        <ProfileInfosList data={user.telephones} title="Telefones"/>
        <ProfileInfosList data={user.addresses} title="Endereços"/>
       </div>
        </div>
      </MainBackground>
    );
  }else{
    return(
      <h1>Carregando...</h1>
    )
  }
};