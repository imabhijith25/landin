import Header from "../../Components/Header/Header";
import styles from "./page.module.css";
const Page = ({ children, authenticate }) => {
    if (authenticate) {
        if (!localStorage?.getItem("userToken")) {
            window.location.href = "/login";
        }
    }
    return (
        <>
            <Header />
            <div className={styles.pageContainer}>{children}</div>
        </>
    );
};

export default Page;
