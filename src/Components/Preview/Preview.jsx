import { useContext } from "react";
import useWidth from "../../Hooks/useWidth";
import { EditorContext } from "../../Screens/Editor/Editor";
import Modal from "../Modal/Modal";
import AddWidget from "./AddWidget";
const Preview = () => {
    const windowWidth = useWidth();
    const editorContextvalues = useContext(EditorContext);
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
                }}
            ></div>
        </>
    );
};

export default Preview;
