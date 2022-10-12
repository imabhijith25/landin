import styles from "./dashboard.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AllCardContext } from "./Dashboard";
const MyProfileDash = () => {
  const profileVal = useSelector((state) => state?.userData);
  const allCards = useContext(AllCardContext);
  return (
    <>
      <div className={styles.pagesHeader}>
        <h3>My Profile</h3>
      </div>
      <div className={styles.profileArea}>
        <div className={styles.formControl}>
          <label>Name</label>
          <input
            type={"text"}
            disabled={true}
            value={profileVal?.name}
            className={cn("textbox")}
          ></input>
        </div>
        <div className={styles.formControl}>
          <label>Email</label>
          <input
            type={"text"}
            disabled={true}
            value={profileVal?.email}
            className={cn("textbox")}
          ></input>
        </div>
        <div className={styles.formControl}>
          <p>Pages created: {allCards?.data?.length}</p>
        </div>
        <div className={styles.formControl}>
          <p>
            The website is in beta mode. For queries related to your
            account,mail at getlandin@gmail.com
          </p>
        </div>

        <div className={styles.formControl}>
          <button className={cn("message")}>Log out</button>
        </div>
      </div>
    </>
  );
};

export default MyProfileDash;
