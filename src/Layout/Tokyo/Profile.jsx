import styles from "./tokyo.module.css";
import { useContext } from "react";
import { TokyoContext } from "../../Screens/Splash/Splash";
const Profile = () => {
    const tokyoData = useContext(TokyoContext);
    return (
        <>
            <div className={styles.profileContainer}>
                <img src={tokyoData?.profilePicUrl} />
                <h3>{tokyoData?.aboutUs?.name}</h3>
            </div>
        </>
    );
};

export default Profile;
