import { createContext } from "react";
import { useContext } from "react";
import Preview from "../../Components/Preview/Preview";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tools from "../../Components/Tools/Tools";
import styles from "./editor.module.css";
import { initialState, reducer } from "./reducer";
import { useReducer } from "react";
export const EditorContext = createContext();

const Editor = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <EditorContext.Provider value={{ state, dispatch }}>
                <Tools />
                <div className={styles.layout}>
                    <Sidebar></Sidebar>
                    <Preview></Preview>
                </div>
            </EditorContext.Provider>
        </>
    );
};

export default Editor;
