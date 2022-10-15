import styles from "./homepage.module.css";
import cn from "classnames";
import { useState } from "react";
import { checkIfCardisAvailable } from "../../API/uploadCard";
import { useNavigate } from "react-router";
const Banner = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const characterValidator = (e) => {
        let char = e.target.value;
        if (char.match(/^[a-zA-Z]*$/)) {
            setUrl(e.target.value);
            setError(null);
        }
    };
    const handleClick = async (e) => {
        const result = await checkIfCardisAvailable(url);
        if (result?.data?.success) {
            navigate(`/register?q=${url}`);
        } else {
            setError(result?.response?.data?.message);
        }
    };
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
                                characterValidator(e);
                            }}
                            maxLength={20}
                        ></input>
                        <p>getlandin.com/u/{url}</p>
                        <button className="button" onClick={handleClick}>
                            Create your page
                        </button>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
