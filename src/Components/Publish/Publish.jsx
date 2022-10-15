import { useState } from "react";
import { useContext, useEffect } from "react";
import { uploadCard } from "../../API/uploadCard";
import Splash, { FullPageLoader } from "../../Screens/Splash/Splash";
import { TabContext } from "../TabWrapper/TabWrapper";
import styles from "./publish.module.css";
import { Link, useLocation } from "react-router-dom";
import copy from "copy-to-clipboard";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Publish = () => {
    const val = useContext(TabContext);
    const [loader, setLoader] = useState(true);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [data, setData] = useState({});
    const editvalues = useLocation();

    const PublishCard = async () => {
        const re = await uploadCard(
            val?.selectedTab?.cardDetails,
            editvalues?.state?.edit
        );
        if (re?.data?.success) {
            setLoader(false);
            setSuccess(true);
            setData(re?.data);
        } else {
            // setLoader(false)

            setLoader(false);
            setFailure(true);
        }
    };
    useEffect(() => {
        PublishCard();
    }, []);

    if (loader) {
        return (
            <>
                <FullPageLoader msg={"Creating your page.."} />
            </>
        );
    }
    if (success) {
        return (
            <>
                <Success data={data} edit={editvalues?.state?.edit} />
            </>
        );
    }
    if (failure) {
        return (
            <>
                <Failure />
            </>
        );
    }
};

const Success = ({ data, edit }) => {
    const rootUrl = window.location.origin;

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                theme="light"
            />
            <div className={styles.wrapper}>
                <div className={styles.success}>
                    <p className={styles.emoji}>🚀</p>
                    <h3>Woohoo!</h3>
                    <div className={styles.msg}>
                        {edit && <p>Page Edited successfully</p>}
                        {!edit && <p>Page created successfully</p>}
                        <p>getlandin.com/u/sdnuds</p>
                    </div>
                    <div className={styles.action}>
                        <button
                            className={cn("button")}
                            onClick={() => {
                                window.open(
                                    `${rootUrl}/u/${data?.data?.url}`,
                                    "_blank"
                                );
                            }}
                        >
                            View my page
                        </button>
                        <button
                            className={cn("button")}
                            onClick={() => {
                                copy(`${rootUrl}/u/${data?.data?.url}`);
                                toast.info(" Copied to clipboard", {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }}
                        >
                            Copy URL
                        </button>
                        <Link to="/dashboard">
                            {" "}
                            <button className={cn("button")}>
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

const Failure = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.success}>
                    <p className={styles.emoji}>😟</p>
                    <h3>Oops!</h3>
                    <div className={styles.msg}>
                        <p>Unable to create page</p>
                        <p>Report this error at getlandin@gmail.com</p>
                    </div>
                    <div className={styles.action}>
                        <Link to="/dashboard">
                            {" "}
                            <button className={cn("button")}>
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Publish;
