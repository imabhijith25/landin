import styles from "./dashboard.module.css"
import DashTab from "./DashTab";
import DashWrap from "./DashWrap";
const Dashboard = () => {
    return (
        <>

            <div className="container">
                <div className={styles.tabContainer}>
                    <DashWrap>
                        <DashTab />
                    </DashWrap>
                </div>
            </div>
        </>
    );
}

export default Dashboard;