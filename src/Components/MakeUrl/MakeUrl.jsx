import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
import styles from "./makeurl.module.css"
import cn from 'classnames'
import { useState } from "react";
const MakeUrl = () => {
    const val = useContext(TabContext)

    const characterValidator = (e) => {
        let char = e.target.value;
        if (char.match(/^[a-zA-Z]*$/)) {
            val.dispatch({ type: "UPDATE STATE", data: { name: "url", value: char } })
        }

    }
    return (
        <>

            <div className={styles.urlContainer}>
                <div className={styles.infoContainer}>
                    <p className={styles.msg}>Start by claiming your url!! </p>

                    <input type={"text"} name="url" className={cn(styles.input, "textbox")}
                        maxLength="20"
                        placeholder={"Enter name or brand"}
                        value={val.selectedTab?.cardDetails?.url}
                        onChange={(e) => {
                            characterValidator(e)
                        }}
                    ></input>
                    <div className={styles.urlDets}>
                        <p className={styles.url}>Your url will be</p>
                        <p className={styles.url}> <b>getlandin.com/u/{val.selectedTab?.cardDetails?.url}</b></p>
                    </div>


                </div>
                <div className={styles.buttonContainer}>

                    <input type="button"
                        value={"Save and next"}
                        disabled={val.selectedTab?.cardDetails?.url ? false : true}
                        className={cn("button", styles.input)} onClick={() => {

                            val.dispatch({ type: "incrementTab" })
                        }}>

                    </input>
                </div>



            </div>



        </>
    );
}

export default MakeUrl;