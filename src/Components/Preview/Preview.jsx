import { useContext } from "react";
import useWidth from "../../Hooks/useWidth";
import { EditorContext } from "../../Screens/Editor/Editor";
import { themeDictionary } from "../../Utils/themeSelector";
import Modal from "../Modal/Modal";
import Profile from "../Profile/Profile";
import AddWidget from "./AddWidget";
import styles from "./preview.module.css";
const Preview = () => {
    const windowWidth = useWidth();
    const editorContextvalues = useContext(EditorContext);
    //used to get the current selected thing
    const handleClick = (e) => {
        editorContextvalues.dispatch({
            type: "SET_CURRENT_SELECTED",
            data: "background",
        });
    };
    return (
        <>
            {editorContextvalues?.state?.widgetModal && (
                <Modal>
                    <AddWidget />
                </Modal>
            )}
            <div
                style={{
                    width: windowWidth < 800 ? "100%" : "80%",
                    backgroundAttachment: "fixed",
                    overflowY: "scroll",
                    background:
                        themeDictionary[
                            editorContextvalues?.state?.preview?.background
                                ?.name
                        ],
                }}
                onClick={handleClick}
            >
                <div className={styles.mainWrapper}>
                    <Profile />
                </div>
            </div>
        </>
    );
};

export default Preview;
