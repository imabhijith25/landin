import styles from "./homepage.module.css";
import cn from "classnames";
import { useState } from "react";
const Banner = () => {
    const [url, setUrl] = useState("");
    return (
        <>
            <div className={styles.bannerContainer}>
                <div className={cn("container", styles.intro)}>
                    <h2>Create stunning bio pages</h2>
                    <p>
                        Make your online presence more visible with customizable
                        landing pages
                    </p>
                    <div className={styles.introInput}>
                        <input
                            type={"text"}
                            className="textbox"
                            placeholder="Your desired URL"
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                            maxLength={20}
                        ></input>
                        <p>getlandin.com/u/{url}</p>
                        <button className="button">Create your page</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
