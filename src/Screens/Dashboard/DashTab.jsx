import { useContext } from "react";
import styles from "./dashboard.module.css"
import { DashContext } from "./DashWrap";
import cn from 'classnames'
import { Link } from "react-router-dom";
const DashTab = () => {
    const val = useContext(DashContext)
    console.log(val)
    const DashMenu = [
        {
            name: "Dashboard"
        },
        {
            name: "Profile"
        }
    ]
    return (
        <>
            <div className={styles.dashTabs}>
                <div className={styles.tabSelectable}>
                    {DashMenu?.map((item, index) => (
                        <div className={index == val?.dashTab.tab ? cn(styles.tabName, styles.selected) : cn(styles.tabName, styles.notSelected)} >
                            <p onClick={() => {
                                val.dashDispatch({ type: "UPDATE TAB", data: index })
                            }}>{item?.name}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.create}>

                    <Link to="/create">
                        Create Page
                    </Link>
                </div>
            </div>
        </>
    );
}

export default DashTab;