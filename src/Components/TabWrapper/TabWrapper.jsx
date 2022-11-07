import React from "react";
import cn from "classnames";
import styles from "./TabWrapper.module.css";
import { useReducer } from "react";
import MakeUrl from "../MakeUrl/MakeUrl";
import Theme from "../Theme/Theme";
import Profile from "../Profile/Profile";
import Links from "../Links/Links";
import Social from "../Social/Social";
import Publish from "../Publish/Publish";
import { useLocation } from "react-router";
import { useEffect } from "react";
export const TabContext = React.createContext();

const initialState = {
    tab: 0,
    cardDetails: {
        url: "",
        profilePicUrl: "",
        themeName: "",
        link: null,
        aboutUs: null,
        post: null,
    },
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setTab":
            return { ...state, tab: action.data };

        case "incrementTab":
            const currTab = state.tab;
            return { ...state, tab: currTab + 1 };

        case "UPDATE STATE":
            const newState = state.cardDetails;
            const newCardDetails = {
                ...newState,
                [action.data.name]: action.data.value,
            };

            return { ...state, cardDetails: newCardDetails };

        case "EDIT INITIAL STATE":
            return { ...state, cardDetails: action?.data };

        case "ADD CUSTOM":
            const newStateCustom = state.cardDetails;
            console.log(action.data?.value);
            newStateCustom.custom = action?.data?.value;
            return { ...state, cardDetails: newStateCustom };
        default:
            return state;
    }
};

const TabWrapper = ({ children }) => {
    const [selectedTab, dispatch] = useReducer(reducer, initialState);
    const editvalues = useLocation();
    useEffect(() => {
        if (editvalues?.state?.edit) {
            const existing = editvalues?.state?.data;
            const newDetails = {
                url: existing?.url,
                profilePicUrl: existing?.profilePicUrl,
                themeName: existing?.themeName,
                aboutUs: JSON.parse(existing?.aboutUs),
                link: JSON.parse(JSON.parse(existing?.link)),
                post: JSON.parse(JSON.parse(existing?.post)),
                custom:
                    existing?.themeName == "custom"
                        ? JSON.parse(existing?.custom)
                        : null,
            };
            dispatch({ type: "EDIT INITIAL STATE", data: newDetails });
        }
    }, []);
    return (
        <>
            <TabContext.Provider value={{ selectedTab, dispatch }}>
                <div className={cn("container", styles.tabContainer)}>
                    {selectedTab?.tab != 5 && (
                        <>
                            {children}
                            <div className={styles.tabItem}>
                                {selectedTab?.tab == 0 &&
                                    !editvalues?.state?.edit && <MakeUrl />}
                                {selectedTab?.tab == 1 && <Theme />}
                                {selectedTab?.tab == 2 && <Profile />}
                                {selectedTab?.tab == 3 && <Links />}
                                {selectedTab?.tab == 4 && <Social />}
                            </div>
                        </>
                    )}
                    {selectedTab?.tab == 5 && <Publish />}
                </div>
            </TabContext.Provider>
        </>
    );
};

export default TabWrapper;
