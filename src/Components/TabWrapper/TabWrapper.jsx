import React from "react"
import cn from "classnames"
import styles from "./TabWrapper.module.css"
import { useReducer } from "react"
import MakeUrl from "../MakeUrl/MakeUrl"
import Theme from "../Theme/Theme"
import Profile from "../Profile/Profile"
import Links from "../Links/Links"
import Social from "../Social/Social"
export const TabContext = React.createContext()

const initialState = {
    tab: 0,
    cardDetails: {
        url: "",
        profilePicUrl: "",
        themeName: "",
        link: null,
        aboutUs: null,
        post: null


    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setTab":
            return { ...state, tab: action.data }

        case "incrementTab":
            const currTab = state.tab
            return { ...state, tab: currTab + 1 }

        case 'UPDATE STATE':
            const newState = state.cardDetails;
            const newCardDetails = { ...newState, [action.data.name]: action.data.value }
            console.log({ ...state, cardDetails: newCardDetails })
            return { ...state, cardDetails: newCardDetails }
        default:
            return state
    }
}


const TabWrapper = ({ children }) => {
    const [selectedTab, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            <TabContext.Provider value={{ selectedTab, dispatch }}>
                <div className={cn("container", styles.tabContainer)}>
                    {children}
                    <div className={styles.tabItem}>
                        {selectedTab?.tab == 0 && <MakeUrl />}
                        {selectedTab?.tab == 1 && <Theme />}
                        {selectedTab?.tab == 2 && <Profile />}
                        {selectedTab?.tab == 3 && <Links />}
                        {selectedTab?.tab == 4 && <Social />}
                    </div>



                </div>
            </TabContext.Provider>
        </>
    );
}

export default TabWrapper