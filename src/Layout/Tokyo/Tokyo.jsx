import { useState } from "react";
import { useEffect } from "react";
import { getThemeBackground, getThemeVariables } from "../../Utils/themeSelector";
import About from "./About";
import Links from "./Links";
import Profile from "./Profile";
import styles from "./tokyo.module.css"
import cn from 'classnames'
import { useCallback } from "react";
const Tokyo = ({ sample }) => {
    const tabs = [
        {
            name: "me"
        },
        {
            name: "About"
        },
        {
            name: "Links"
        }
    ]
    const [currentTab, setCurrentTab] = useState(0)
    let tab = currentTab
    const assignTheme = () => {
        const sampleTheme = "tokyo_night"
        const theme = getThemeVariables(sampleTheme)
        const ele = document.getElementById("layoutContainer")
        const keyArray = Object.keys(theme)
        keyArray.forEach(item => {
            ele.style.setProperty(item, theme[item])
        })
    }
    const printMousePos = useCallback((event) => {
        if (event.clientX < window.innerWidth / 2) {
            if (tab <= 0) {
                return

            }

            tab = tab - 1
            setCurrentTab(tab)


        }
        else {
            if (tab >= 2) {
                return

            }

            tab = tab + 1
            setCurrentTab(tab)




        }
    }, [currentTab])

    useEffect(() => {
        document.addEventListener("click", printMousePos);
        assignTheme()

    }, [])

    return (

        <>
            <div className={styles.overallContainer} id="layoutContainer">
                <div className={styles.currentLocation}>
                    {tabs.map((item, index) => (
                        <div className={index == currentTab ? cn(styles.tabs, styles.selected) : cn(styles.tabs, styles.notSelected)}
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentTab(index)
                            }}
                        >

                        </div>
                    ))}
                </div>
                <div className={styles.cardContainer}>
                    <div className={styles.profile} style={{ backgroundImage: `url(${getThemeBackground("tokyo_winter").location})` }}>
                        {currentTab == 0 && <Profile />}
                        {currentTab == 1 && <About />}
                        {currentTab == 2 && <Links />}

                    </div>
                    <div className={styles.socialContainer}>
                        <img src="./images/Social/instagram.svg" />
                        <img src="./images/Social/dribbble.svg" />
                        <img src="./images/Social/mail.svg" />
                        <img src="./images/Social/linkedin.svg" />
                    </div>

                </div>

            </div>

        </>

    );
}

export default Tokyo;