import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { sessionRefresh } from "../../service/apiPosts";

export const LoggedComponent = () => {
    const sesseionRefreshInterval = async () =>{
        await sessionRefresh();
    }
    useEffect(()=>{
        setInterval(sesseionRefreshInterval,2700000)
    },[])
    return(
        <div className={styles.container}>
            <Outlet/>
        </div>
    )
}