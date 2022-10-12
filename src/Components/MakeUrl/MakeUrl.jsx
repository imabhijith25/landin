import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
import styles from "./makeurl.module.css";
import cn from "classnames";
import { useState } from "react";
import { checkIfCardisAvailable } from "../../API/uploadCard";
const MakeUrl = () => {
  const val = useContext(TabContext);
  const [error, setError] = useState(false);
  const characterValidator = (e) => {
    let char = e.target.value;
    if (char.match(/^[a-zA-Z]*$/)) {
      val.dispatch({
        type: "UPDATE STATE",
        data: { name: "url", value: char },
      });
    }
  };
  const checkForCards = async () => {
    const resp = await checkIfCardisAvailable(
      val.selectedTab?.cardDetails?.url
    );
    if (!resp?.data?.success) {
      setError(true);
    } else {
      val.dispatch({ type: "incrementTab" });
    }
  };
  return (
    <>
      <div className={styles.urlContainer}>
        <div className={styles.infoContainer}>
          <p className={styles.msg}>Start by claiming your url!! </p>

          <input
            type={"text"}
            name="url"
            className={cn(styles.input, "textbox")}
            maxLength="20"
            placeholder={"Enter name or brand"}
            value={val.selectedTab?.cardDetails?.url}
            onChange={(e) => {
              setError(null);
              characterValidator(e);
            }}
          ></input>
          {error && (
            <p className={styles.urlerror}>This url is already taken</p>
          )}
          {!error && (
            <div className={styles.urlDets}>
              <p className={styles.url}>Your url will be</p>
              <p className={styles.url}>
                {" "}
                <b>getlandin.com/u/{val.selectedTab?.cardDetails?.url}</b>
              </p>
            </div>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <input
            type="button"
            value={"Save and next"}
            disabled={val.selectedTab?.cardDetails?.url ? false : true}
            className={cn("button", styles.input)}
            onClick={() => {
              checkForCards();
            }}
          ></input>
        </div>
      </div>
    </>
  );
};

export default MakeUrl;
