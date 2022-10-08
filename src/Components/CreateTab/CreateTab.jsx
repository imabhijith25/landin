import { useState } from "react";
import styles from "./CreateTab.module.css"
import { TabContext } from "../TabWrapper/TabWrapper";
import { useContext } from "react";
const CreateTab = () => {
    const val = useContext(TabContext)
    const tabs = [
        {
            name: "Start",
            key: "start"
        },
        {
            name: "Theme",
            key: "theme"
        },
        {
            name: "Profile",
            key: "profile"
        },
        {
            name: "Links",
            key: "links"
        },
        {
            name: "Social",
            key: "social"
        },


    ]
    const handleTabClick = (e, index) => {
        val.dispatch({ type: "setTab", data: index })

    }
    return (

        <>

            <div className={styles.tabContainer}>
                <div className={styles.selectedTab}>

                    {tabs?.map((item, index) => (
                        <div className={styles.tab} onClick={(e) => { handleTabClick(e, index) }} key={index}>

                            <p className={val.selectedTab?.tab == index ? styles.selected : styles.notSelected}>{item?.name}</p>
                        </div>
                    ))}


                </div>

            </div>


        </>
    );
}

export default CreateTab