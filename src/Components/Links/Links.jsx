import { useReducer } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import LinkCards from "./LinkCards";
import styles from "./links.module.css";
import cn from "classnames";
import { useState } from "react";
import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
export const LinkContext = createContext();
const initialState = [
    {
        title: "",
        url: "",
    },
];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_NEW":
            return [...state, action.data];
        case "EDIT VALUE":
            const newArr = state;
            const newState = newArr.map((item, index) => {
                if (index == action.data.index) {
                    return { ...item, title: action.data.title };
                } else {
                    return item;
                }
            });

            return newState;

        case "EDIT LINK":
            const newArrLink = state;
            const newStateLink = newArrLink.map((item, index) => {
                if (index == action.data.index) {
                    return { ...item, url: action.data.url };
                } else {
                    return item;
                }
            });

            return newStateLink;

        case "CLOSE":
            const deleted = state;
            const newDeleted = deleted.filter((item, index) => {
                if (index !== action.data.index) {
                    return item;
                }
            });

            return newDeleted;

        case "SET VALUES EXTERNAL":
            return action.data;
    }
};
const Links = () => {
    const val = useContext(TabContext);
    const [linkValue, linkDispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (val?.selectedTab.cardDetails?.link) {
            linkDispatch({
                type: "SET VALUES EXTERNAL",
                data: val?.selectedTab?.cardDetails?.link,
            });
        }
    }, []);
    return (
        <>
            <LinkContext.Provider value={{ linkValue, linkDispatch }}>
                <div className={styles.linkContainer}>
                    <div className={styles.pseudoContainer} id="container">
                        <div className={styles.fixed}>
                            <p className={styles.head}>
                                Showcase your latest works
                            </p>
                            <div className={styles.addmore}>
                                {linkValue.length < 5 && (
                                    <p
                                        className={styles.addMoreButton}
                                        onClick={() => {
                                            linkDispatch({
                                                type: "ADD_NEW",
                                                data: { title: "", url: "" },
                                            });
                                        }}
                                    >
                                        +<u> Add More</u>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className={styles.cardSection}>
                            {linkValue?.map((item, index) => (
                                <LinkCards key={index} index={index} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <input
                            type="button"
                            value={"Save and next"}
                            disabled={
                                linkValue?.[0]?.title && linkValue?.[0]?.url
                                    ? false
                                    : true
                            }
                            className={cn("button", styles.input)}
                            onClick={() => {
                                val.dispatch({
                                    type: "UPDATE STATE",
                                    data: { name: "link", value: linkValue },
                                });
                                val.dispatch({ type: "incrementTab" });
                            }}
                        ></input>
                    </div>
                </div>
            </LinkContext.Provider>
        </>
    );
};

export default Links;
