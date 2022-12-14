import styles from "./homepage.module.css";
import cn from "classnames";
import { useState } from "react";
import { checkIfCardisAvailable } from "../../API/uploadCard";
import { useNavigate } from "react-router";
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from "react-router-dom";
const Banner = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const characterValidator = (e) => {
        let char = e.target.value;
        if (char.match(/^[a-zA-Z]*$/)) {
            setUrl(e.target.value);
            setError(null);
        }
    };
    const handleClick = async (e) => {
        setLoader(true);
        const result = await checkIfCardisAvailable(url);
        if (result?.data?.success) {
            setLoader(false);
            navigate(`/register?q=${url}`);
        } else {
            setError(result?.response?.data?.message);
            setLoader(false);
        }
    };
    return (
        <>
            <div
                className={styles.bannerContainer}
                style={{
                    backgroundImage: `url(${"/images/bgWave.svg"})`,
                    backgroundPosition: "100% 100%",
                    backgroundSize: "cover",
                }}
            >
                <div className={cn("container", styles.intro)}>
                    <h2>Create stunning bio pages</h2>
                    <p>
                        Make your online presence more visible with customizable
                        landing pages
                    </p>
                    <div className={styles.links}>
                        <span className={styles.linkSpan}>
                            {" "}
                            <Link to="/login">Login</Link> /{" "}
                            <Link to="/register">Register</Link>
                        </span>
                    </div>

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
                            {loader ? (
                                <PuffLoader size={12} color="white" />
                            ) : (
                                "Create Your Page"
                            )}
                        </button>
                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
