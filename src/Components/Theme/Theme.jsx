import styles from "./theme.module.css"
import { themeList } from "../../Utils/completeThemes";
import cn from 'classnames'
import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
const Theme = () => {
    const val = useContext(TabContext)
    const handleThemeSelect = (e, item) => {
        val.dispatch({ type: "UPDATE STATE", data: { name: "themeName", value: item.name } })
    }
    const themeSelectorEffect = (item) => {
        if (val.selectedTab?.cardDetails.themeName == item?.name) {
            return true
        }
        return false

    }
    return (<>

        <div className={styles.themeContainer}>
            <p className={styles.head}>Click to choose a theme</p>
            <div className={styles.themeWrapper}>
                {themeList?.map(item => (
                    <div className={styles.theme}>
                        <div className={styles.imageHolder} onClick={(e) => { handleThemeSelect(e, item) }} style={themeSelectorEffect(item) ? { opacity: 0.5 } : { opacity: 1 }}>
                            <img src={item.location} className={styles.themeImage} />
                            <button className={styles.sampleButton}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    window.open("/u", "_blank")
                                }}
                            >See Preview</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <input type="button"
                    value={"Save and next"}
                    disabled={val.selectedTab?.cardDetails.themeName ? false : true}
                    className={cn("button", styles.input)} onClick={() => {
                        val.dispatch({ type: "incrementTab" })
                    }}>

                </input>
            </div>

        </div>
    </>);
}

export default Theme;