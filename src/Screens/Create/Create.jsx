import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import CreateTab from "../../Components/CreateTab/CreateTab";
import TabWrapper from "../../Components/TabWrapper/TabWrapper";
import styles from "./create.module.css";

const Create = ({ edit }) => {
    const editable = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (edit && !editable?.state?.edit) {
            navigate("/create");
        }
    }, []);
    return (
        <>
            <div className="container">
                <div className={styles.tabContainer}>
                    <TabWrapper>
                        <CreateTab />
                    </TabWrapper>
                </div>
            </div>
        </>
    );
};

export default Create;
