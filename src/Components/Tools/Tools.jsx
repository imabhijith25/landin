import { useContext } from "react";
import useWidth from "../../Hooks/useWidth";
import { EditorContext } from "../../Screens/Editor/Editor";
import styles from "./tools.module.css";
const Tools = () => {
    const windowWidth = useWidth();
    const editorContextvalues = useContext(EditorContext);
    return (
        <div className={styles.tools}>
            {windowWidth < 800 && (
                <div
                    className={styles.menuIcon}
                    onClick={() => {
                        editorContextvalues.dispatch({
                            type: "TOGGLE_SIDEBAR",
                        });
                    }}
                >
                    {editorContextvalues?.state?.sidebarOpen ? (
                        <img src={"/images/Icons/x.svg"} alt="menu"></img>
                    ) : (
                        <img src={"/images/Icons/menu.svg"} alt="menu"></img>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tools;
