import Header from "../../Components/Header/Header";
import styles from "./page.module.css"
const Page = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.pageContainer}>
                {children}
            </div>

        </>
    );
}

export default Page;