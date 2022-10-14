import styles from "./dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { themeList } from "../../Utils/completeThemes";
import cn from "classnames";
import { useContext, useState, useEffect } from "react";
import { AllCardContext } from "./Dashboard";
import { FullPageLoader, Splash } from "../Splash/Splash";
import { getThemeBackground } from "../../Utils/themeSelector";
import { useRef } from "react";
import { deleteCard } from "../../API/deleteCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
const DashView = () => {
    const allcards = useContext(AllCardContext);
    console.log(allcards);
    if (allcards.cardState?.loading) {
        return (
            <>
                <FullPageLoader />
            </>
        );
    }
    if (allcards.cardState?.data?.length == 0) {
        return (
            <>
                <div>
                    <NoView />
                </div>
            </>
        );
    }

    if (allcards.cardState?.data?.length > 0 && !allcards?.cardState?.loading) {
        return (
            <>
                <CardGrid />
            </>
        );
    }
};
const NoView = () => {
    const image =
        "https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    return (
        <>
            <div className={styles.noView}>
                <div className={styles.noViewWrap}>
                    <img src={image} alt={"No View"}></img>
                    <h3>There are no pages yet..</h3>
                    <p>The pages that you create will appear here</p>
                    <p>
                        <Link to="/create">Click here</Link> to create one
                    </p>
                </div>
            </div>
        </>
    );
};

const CardGrid = () => {
    const [modal, setModal] = useState({ show: false, data: null });
    const allcards = useContext(AllCardContext);

    const handleClose = () => {
        setModal({ show: false, data: null });
    };
    const handleRemove = (url) => {
        allcards?.dispatch({ type: "DELETE", data: url });
    };
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
            {modal?.show && (
                <DashModal
                    data={modal}
                    handleClose={handleClose}
                    handleRemove={handleRemove}
                />
            )}
            <div className={styles.pagesHeader}>
                <h3>My Pages</h3>
            </div>
            <div className={styles.gridWrapper}>
                <div className={styles.gridArea}>
                    {allcards?.cardState?.data?.map((item) => (
                        <div className={styles.cardWrapper}>
                            <div
                                className={styles.card}
                                onClick={() => {
                                    setModal({ show: true, data: item });
                                }}
                            >
                                <button className={styles.sampleButton}>
                                    u/{item?.url}
                                </button>
                                <img
                                    src={
                                        getThemeBackground(item?.themeName)
                                            ?.location
                                    }
                                    alt="my_items"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.pagesHeader}>
                <p>You can create a maximum of 6 Pages</p>
            </div>
        </>
    );
};

const DashModal = ({ data, handleClose, handleRemove }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);

    const outsideClick = (e) => {
        if (ref?.current?.contains(e.target)) {
            console.log(true);
        } else {
            handleClose();
        }
    };
    useEffect(() => {
        if (load) {
            document.addEventListener("click", outsideClick);

            return () => {
                document.removeEventListener("click", outsideClick);
            };
        }
    }, [load]);

    useEffect(() => {
        setLoad(true);
    }, []);

    const handleDelete = async (url) => {
        setDeleteLoader(true);
        const resp = await deleteCard(url);
        if (resp?.data?.success) {
            console.log("yes");
            handleRemove(url);
            toast.info(" Page Deleted!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            handleClose();
            setDeleteLoader(false);
        } else {
            setDeleteLoader(false);
        }
    };

    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent} ref={ref}>
                    <div className={styles.closeButton} onClick={handleClose}>
                        &#10006;
                    </div>
                    <div className={styles.heading}>
                        <p>u/{data?.data?.url}</p>
                    </div>
                    <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            copy(
                                `${window.location.origin}/u/${data?.data?.url}`
                            );
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
                        ✂️ <u>Copy this URL</u>
                    </p>

                    <div className={cn(styles.actionButton)}>
                        <input
                            type="button"
                            className="button"
                            disabled={deleteLoader}
                            value="View Page"
                            onClick={() => {
                                window.open(
                                    `${window.location.origin}/u/${data?.data?.url}`,
                                    "_blank"
                                );
                            }}
                        ></input>
                        <input
                            type="button"
                            className="button"
                            disabled={deleteLoader}
                            value="Edit Page"
                            onClick={() => {
                                navigate("/edit", {
                                    state: { edit: true, data: data?.data },
                                });
                            }}
                        ></input>
                        <input
                            type="button"
                            className="button"
                            disabled={deleteLoader}
                            value={deleteLoader ? "Deleting..." : "Delete Page"}
                            onClick={() => {
                                handleDelete(data?.data?.url);
                            }}
                        ></input>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashView;
