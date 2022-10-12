import { useReducer } from "react";
import { createContext } from "react";
import DashView from "./DashView";
import MyProfileDash from "./MyProfileDash";

export const DashContext = createContext();
const intitalState = {
  tab: 0,
};

const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case "UPDATE TAB":
      const currTab = action.data;
      return { ...state, tab: currTab };
  }
};
const DashWrap = ({ children }) => {
  const [dashTab, dashDispatch] = useReducer(reducer, intitalState);
  return (
    <DashContext.Provider value={{ dashTab, dashDispatch }}>
      <div>
        {children}
        {dashTab?.tab == 0 && <DashView />}
        {dashTab?.tab == 1 && <MyProfileDash />}
      </div>
    </DashContext.Provider>
  );
};

export default DashWrap;
