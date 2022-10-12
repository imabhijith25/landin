import styles from "./tokyo.module.css";
import { useContext } from "react";
import { TokyoContext } from "../../Screens/Splash/Splash";
const About = () => {
    const tokyoData = useContext(TokyoContext);
    return (
        <>
            <div className={styles.aboutContainer}>
                <h3>{tokyoData?.aboutUs?.bio}</h3>
            </div>
        </>
    );
};

export default About;
