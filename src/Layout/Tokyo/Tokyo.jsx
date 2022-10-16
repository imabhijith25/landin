import { useState } from "react";
import { useEffect } from "react";
import {
    getThemeBackground,
    getThemeVariables,
} from "../../Utils/themeSelector";
import About from "./About";
import Links from "./Links";
import Profile from "./Profile";
import styles from "./tokyo.module.css";
import cn from "classnames";
import { useCallback, useContext } from "react";
import { TokyoContext } from "../../Screens/Splash/Splash";
import { httpParser } from "../../Utils/httpParser";
const Tokyo = ({ sample }) => {
    const tokyoData = useContext(TokyoContext);
    const tabs = [
        {
            name: "me",
        },
        {
            name: "About",
        },
        {
            name: "Links",
        },
    ];
    const [currentTab, setCurrentTab] = useState(0);
    let tab = currentTab;
    const assignTheme = () => {
        const sampleTheme = tokyoData?.themeName;
        const theme = getThemeVariables(sampleTheme);
        const ele = document.getElementById("layoutContainer");
        const keyArray = Object.keys(theme);
        keyArray.forEach((item) => {
            ele.style.setProperty(item, theme[item]);
        });
    };
    const printMousePos = useCallback(
        (event) => {
            if (event.clientX < window.innerWidth / 2) {
                if (tab <= 0) {
                    return;
                }

                tab = tab - 1;
                setCurrentTab(tab);
            } else {
                if (tab >= 2) {
                    return;
                }

                tab = tab + 1;
                setCurrentTab(tab);
            }
        },
        [currentTab]
    );

    useEffect(() => {
        if (tokyoData) {
            document.addEventListener("click", printMousePos);
            assignTheme();
        }
    }, [tokyoData]);

    return (
        <>
            <div className={styles.overallContainer} id="layoutContainer">
                <div className={styles.currentLocation}>
                    {tabs.map((item, index) => (
                        <div
                            className={
                                index == currentTab
                                    ? cn(styles.tabs, styles.selected)
                                    : cn(styles.tabs, styles.notSelected)
                            }
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentTab(index);
                            }}
                        ></div>
                    ))}
                </div>
                <div className={styles.cardContainer}>
                    {tokyoData && (
                        <div
                            className={styles.profile}
                            style={{
                                backgroundImage: `url(${
                                    getThemeBackground(tokyoData?.themeName)
                                        .location
                                })`,
                            }}
                        >
                            {currentTab == 0 && <Profile />}
                            {currentTab == 1 && <About />}
                            {currentTab == 2 && <Links />}
                        </div>
                    )}

                    <div className={styles.socialContainer}>
                        {tokyoData?.post?.map((item, index) => (
                            <img
                                key={index}
                                src={`/images/social/${item?.title?.toLowerCase()}.svg`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (item?.title?.toLowerCase() == "mail") {
                                        window.open("mailto:" + item?.url);
                                    } else {
                                        window.open(
                                            httpParser(item?.url),
                                            "_blank"
                                        );
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tokyo;
