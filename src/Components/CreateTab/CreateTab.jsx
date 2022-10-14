import { useEffect, useState } from "react";
import styles from "./CreateTab.module.css";
import { TabContext } from "../TabWrapper/TabWrapper";
import { useContext } from "react";
import { useLocation } from "react-router";
const CreateTab = () => {
    const val = useContext(TabContext);
    const editable = useLocation();
    const tabs = [
        {
            name: "Start",
            key: "start",
            visible: editable?.state?.edit ? false : true,
        },
        {
            name: "Theme",
            key: "theme",
            visible: true,
        },
        {
            name: "Profile",
            key: "profile",
            visible: true,
        },
        {
            name: "Links",
            key: "links",
            visible: true,
        },
        {
            name: "Social",
            key: "social",
            visible: true,
        },
    ];
    //used to set tab to 1 when editing
    useEffect(() => {
        if (editable?.state?.edit) {
            val.dispatch({ type: "setTab", data: 1 });
        }
    }, []);
    const handleTabClick = (e, index) => {
        val.dispatch({ type: "setTab", data: index });
    };
    return (
        <>
            <div className={styles.tabContainer}>
                <div className={styles.selectedTab}>
                    {tabs?.map(
                        (item, index) =>
                            item?.visible && (
                                <>
                                    <div
                                        className={styles.tab}
                                        onClick={(e) => {
                                            handleTabClick(e, index);
                                        }}
                                        key={index}
                                    >
                                        <p
                                            className={
                                                val.selectedTab?.tab == index
                                                    ? styles.selected
                                                    : styles.notSelected
                                            }
                                        >
                                            {item?.name}
                                        </p>
                                    </div>
                                </>
                            )
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateTab;
