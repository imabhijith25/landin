import { useContext, useEffect, useState } from "react";
import useWidth from "../../Hooks/useWidth";
import { EditorContext } from "../../Screens/Editor/Editor";
import styles from "./sidebar.module.css";

const Sidebar = () => {
    const windowWidth = useWidth();
    const editorContext = useContext(EditorContext);
    console.log(editorContext);
    return (
        <>
            {editorContext?.state?.sidebarOpen && (
                <div
                    style={{
                        backgroundColor: "rgb(43, 39, 39)",
                        borderRight: "1px solid rgb(129, 129, 129)",
                        width: windowWidth < 800 ? "300px" : "20%",
                        position: windowWidth < 800 ? "absolute" : "static",
                        height: windowWidth < 800 ? "100%" : "auto",
                        top: "0px",
                        left: "0px",
                        zIndex: 2,
                    }}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
