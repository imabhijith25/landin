import { useContext } from "react";
import { EditorContext } from "../../Screens/Editor/Editor";
import { themeDictionary } from "../../Utils/themeSelector";
import styles from "./ThemeSelector.module.css";
const ThemeSelector = () => {
    const editorContextvalues = useContext(EditorContext);
    const changeTheme = (item) => {
        editorContextvalues.dispatch({
            type: "CHANGE_BACKGROUND",
            data: {
                type: "gradient",
                name: item,
            },
        });
    };
    return (
        <>
            <div className={styles.ThemeSelector}>
                <h4>Select background</h4>
                <p>Choose from a variety of backgrounds to suit your style</p>
                <div className={styles.cardContainer}>
                    {Object.keys(themeDictionary)?.map((item, index) => (
                        <div
                            className={styles.themes}
                            onClick={() => {
                                changeTheme(item);
                            }}
                            style={{
                                background: themeDictionary[item],
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ThemeSelector;
