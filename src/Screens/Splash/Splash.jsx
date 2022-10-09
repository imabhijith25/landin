import { Children } from "react";
import styles from "./splash.module.css"
import PuffLoader from 'react-spinners/PuffLoader'
import { facts } from "../../Utils/facts";
export const Splash = ({ children }) => {
    //initialise sample data here
    return (
        <>
            <div>
                {children}
                {/* <FullPageLoader /> */}
            </div>
        </>
    );
}
export const FullPageLoader = ({ msg }) => {
    const random = Math.floor(Math.random() * 10 % 9);
    return (
        <>
            <div className={styles.fullPage}>
                <div className={styles.loader}>
                    <PuffLoader color="#7684a5" loading={true} size={65} />
                    {!msg ? <p>{facts[random]}</p> : <p>{msg}</p>}
                </div>

            </div>

        </>
    )
}
