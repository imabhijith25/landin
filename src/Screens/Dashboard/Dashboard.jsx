import { createContext } from "react";
import { useContext } from "react";
import { useFetch } from "../../Hooks/useFetch";
import styles from "./dashboard.module.css";
import DashTab from "./DashTab";
import DashWrap from "./DashWrap";
export const AllCardContext = createContext();
const Dashboard = () => {
  const [status] = useFetch("/card/getAllCard");
  console.log(status);
  return (
    <>
      <AllCardContext.Provider value={status}>
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
