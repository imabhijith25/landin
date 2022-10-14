import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useFetch } from "../../Hooks/useFetch";
import styles from "./dashboard.module.css";
import DashTab from "./DashTab";
import DashWrap from "./DashWrap";
export const AllCardContext = createContext();
const initialState = [];
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INITIATE":
            return action.data;
        case "DELETE":
            const newData = state?.data?.filter((item) => {
                return item.url != action.data;
            });
            return { ...state, data: newData };
        default:
            return state;
    }
};
const Dashboard = () => {
    const [status] = useFetch("/card/getAllCard");
    const [cardState, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: "INITIATE", data: status });
    }, [status]);
    return (
        <>
            <AllCardContext.Provider value={{ cardState, dispatch }}>
                <div className="container">
                    <div className={styles.tabContainer}>
                        <DashWrap>
                            <DashTab />
                        </DashWrap>
                    </div>
                </div>
            </AllCardContext.Provider>
        </>
    );
};

export default Dashboard;
