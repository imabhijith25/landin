import { useReducer } from "react";
import { createContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import SocialCards from "./SocialCards";
import styles from "./social.module.css"
import cn from 'classnames'
import { useState } from "react";
import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
export const SocialContext = createContext();
const initialState = [
    {
        title: "Website",
        url: ""
    }
]

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW":

            return [...state, action.data]
        case "EDIT VALUE":
            const newArr = state;
            const newState = newArr.map((item, index) => {
                if (index == action.data.index) {
                    return { ...item, title: action.data.title }

                }
                else {
                    return item
                }
            })
            console.log(newState)
            return newState

        case "EDIT LINK":
            const newArrLink = state;
            const newStateLink = newArrLink.map((item, index) => {
                if (index == action.data.index) {
                    return { ...item, url: action.data.url }

                }
                else {
                    return item
                }
            })
            console.log(newStateLink)
            return newStateLink

        case "CLOSE":
            const deleted = state;
            const newDeleted = deleted.filter((item, index) => {
                if (index !== action.data.index) {
                    return item
                }
            })
            console.log(newDeleted)
            return newDeleted
        case "SET VALUES EXTERNAL":
            console.log(action.data)
            return action.data
    }


}
const Social = () => {
    const [socialValue, socialDispatch] = useReducer(reducer, initialState)
    const val = useContext(TabContext)
    const [field, setField] = useState(null)
    //get already saved values
    useEffect(() => {
        if (val?.selectedTab?.cardDetails?.post) {
            socialDispatch({ type: "SET VALUES EXTERNAL", data: val?.selectedTab?.cardDetails?.post })

        }
    }, [])

    //used to check if all the validation are proper
    const finalValidation = () => {
        const tabNameIndex = {
            "url": [0, "You haven't added your URL. Click me to take you there"],
            "themeName": [1, "You haven't selected your theme. Click me.."],
            "aboutUs": [2, "Fill out your profile. Click me to take you there"],
            "link": [3, "Add your links. Click me to take you there"],
            "post": [4, "Add your social media. Click me to take you there"]

        }
        const finalObj = val?.selectedTab?.cardDetails
        const keyArray = Object.keys(finalObj)

        let flagKey = null
        let i = 0;
        console.log("loop started")
        while (i < keyArray.length) {
            let key = keyArray[i]

            if ((finalObj[key] == null || finalObj[key] == "") && key != "profilePicUrl" && key != "post") {
                setField(tabNameIndex[key])
                break
            }
            i++
        }




    }
    return (
        <>
            <SocialContext.Provider value={{ socialValue, socialDispatch }}>
                <div className={styles.linkContainer}>
                    <div className={styles.pseudoContainer} id="container">
                        <div className={styles.fixed}>
                            <p className={styles.head}>Add your social media details!</p>
                            {field &&
                                <div className={styles.incompleteField} onClick={() => {
                                    setField(null)
                                    val.dispatch({ type: "setTab", data: field?.[0] })
                                }}>
                                    <p>{field?.[1]}</p>
                                </div>
                            }
                            <div className={styles.addmore}>
                                {socialValue.length < 5 &&
                                    <p className={styles.addMoreButton}
                                        onClick={() => {

                                            socialDispatch({ type: "ADD_NEW", data: { title: "", url: "" } })

                                        }}
                                    >+<u> Add More</u></p>
                                }
                            </div>
                        </div>
                        <div className={styles.cardSection}>
                            {socialValue?.map((item, index) => (
                                <SocialCards key={index} index={index} />
                            ))}

                        </div>
                    </div>

                    <div className={styles.buttonContainer}>

                        <input type="button"
                            value={"Save and Publish"}
                            disabled={(socialValue?.[0]?.url) ? false : true}
                            className={cn("button", styles.input)} onClick={() => {
                                val.dispatch({ type: "UPDATE STATE", data: { name: "post", value: socialValue } })
                                finalValidation()
                            }}>

                        </input>
                    </div>

                </div>

            </SocialContext.Provider>
        </>
    );
}

export default Social;