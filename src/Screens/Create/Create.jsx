import React, { useState } from "react";
import CreateTab from "../../Components/CreateTab/CreateTab";
import TabWrapper from "../../Components/TabWrapper/TabWrapper";
import styles from "./create.module.css"

const Create = () => {

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
}

export default Create;