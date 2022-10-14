import styles from "./tokyo.module.css";
import { useContext } from "react";
import { TokyoContext } from "../../Screens/Splash/Splash";
import { httpParser } from "../../Utils/httpParser";
const Links = () => {
    const tokyoData = useContext(TokyoContext);
    const sampleLinks = tokyoData?.link;
    return (
        <>
            <div className={styles.aboutContainer}>
                {sampleLinks.map((item) => (
                    <div
                        className={styles.links}
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(httpParser(item?.url), "_blank");
                        }}
                    >
                        {item?.title}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Links;
