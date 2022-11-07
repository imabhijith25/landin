import styles from "./theme.module.css";
import { CirclePicker } from "react-color";
import { storage } from "../../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { themeValidator } from "../../Utils/formValidation";
import { TabContext } from "../TabWrapper/TabWrapper";
import { useEffect } from "react";
const CustomThemeModal = ({ handleClose, customSelected }) => {
    const val = useContext(TabContext);
    const bgImagePlaceholder =
        "https://images.unsplash.com/photo-1666221340457-1af7d0be8ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80";
    const [custom, setCustom] = useState({
        color_one: "",
        color_two: "",
        bgImage: "",
    });

    //set initial custom values if custom values are already present
    useEffect(() => {
        if (customSelected) {
            console.log(val?.selectedTab?.cardDetails);
            setCustom(val?.selectedTab?.cardDetails?.custom);
        }
    }, [customSelected]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const handleFileClick = () => {
        const fileButton = document.getElementById("fileuploaderTheme");
        fileButton.click();
    };
    const fileChange = async (e) => {
        setLoader(true);
        const file = e.target.files[0];
        const allowed = ["png", "jpg", "jpeg"];
        const type = file.type.split("/")[1];
        if (!allowed.includes(type)) {
            e.target.value = null;
            setError({
                state: true,
                msg: "Invalid file type. Only Jpeg, png supported",
            });
            setLoader(false);
            return;
        }
        if (file?.size / 1024 / 1024 > 8) {
            e.target.value = null;
            setError({ state: true, msg: "File size exceeded 8MB" });
            setLoader(false);
            return;
        }
        const storageRef = ref(storage, `themeBg/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    // setProfileValues({
                    //     ...profileValues,
                    //     profilePicUrl: downloadURL,
                    // });
                    setCustom({
                        ...custom,
                        bgImage: downloadURL,
                    });
                    setError(null);
                    setLoader(false);
                    e.target.value = null;
                });
            }
        );
    };

    const handleSubmit = () => {
        let err = themeValidator(
            custom?.color_one,
            custom?.color_two,
            custom?.bgImage
        );
        if (Object?.keys(err)?.length == 0) {
            console.log(val);
            val.dispatch({
                type: "UPDATE STATE",
                data: { name: "themeName", value: "custom" },
            });
            val.dispatch({
                type: "ADD CUSTOM",
                data: { name: "custom", value: custom },
            });
            handleClose(false);
        } else {
            setError(err);
        }
    };

    const handlePreview = () => {
        let err = themeValidator(
            custom?.color_one,
            custom?.color_two,
            custom?.bgImage
        );
        if (Object?.keys(err)?.length == 0) {
            window.open(
                `${window.location.origin}/amy/custom?c1=${encodeURIComponent(
                    custom?.color_one
                )}&c2=${encodeURIComponent(
                    custom?.color_two
                )}&bg=${encodeURIComponent(custom?.bgImage)}`,
                "_blank"
            );
        } else {
            setError(err);
        }
    };
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.heading}>
                        <h3>Choose custom theme</h3>
                        <p>You can also view the preview</p>
                        <div
                            className={styles.closeButton}
                            onClick={() => {
                                handleClose(false);
                            }}
                        >
                            &#10006;
                        </div>
                    </div>

                    <div className={styles.colorPicker}>
                        <div className={styles.colorArea}>
                            <label>Color #1</label>
                            <p className={styles.error}>
                                {" "}
                                {error?.color_one && error?.color_one}
                            </p>
                            <div className={styles.colorPicker}>
                                <CirclePicker
                                    color={custom?.color_one}
                                    colors={[
                                        "#560090",
                                        "#5B89BF",
                                        "#BF5B5B",
                                        "#038373",
                                        "#dd6b0e",
                                        "#DA3F67",
                                    ]}
                                    onChangeComplete={(color) => {
                                        setError(null);
                                        setCustom({
                                            ...custom,
                                            color_one: color?.hex,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className={styles.colorArea}>
                            <label>Color #2</label>
                            <p className={styles.error}>
                                {" "}
                                {error?.color_two && error?.color_two}
                            </p>
                            <div className={styles.colorPicker}>
                                <CirclePicker
                                    color={custom?.color_two}
                                    colors={[
                                        "#7f04d0",
                                        "#1e589a",
                                        "#974338",
                                        "#125149",
                                        "#783b0a",
                                        "#981c3b",
                                    ]}
                                    onChangeComplete={(color) => {
                                        console.log(color?.hex);
                                        setError(null);
                                        setCustom({
                                            ...custom,
                                            color_two: color?.hex,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.themeBackgroundUploader}>
                        <div className={styles.bgContainer}>
                            <div className={styles.puff}>
                                {loader && (
                                    <PuffLoader
                                        color="white"
                                        loading={true}
                                        size={64}
                                    />
                                )}
                            </div>
                            <img
                                src={
                                    custom?.bgImage
                                        ? custom?.bgImage
                                        : bgImagePlaceholder
                                }
                            ></img>
                            <div className={styles.themeText}>
                                <input
                                    type={"file"}
                                    style={{ display: "none" }}
                                    id="fileuploaderTheme"
                                    accept="image/*"
                                    onChange={fileChange}
                                ></input>
                                <p
                                    onClick={() => {
                                        if (!loader) {
                                            setError(null);
                                            handleFileClick();
                                        }
                                    }}
                                >
                                    Choose a custom background Image
                                </p>
                                <p
                                    onClick={() => {
                                        if (!loader) {
                                            handleFileClick();
                                        }
                                    }}
                                >
                                    Click here to upload
                                </p>
                                <p className={styles.error}>
                                    {" "}
                                    {error?.bgImage && error?.bgImage}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonArea}>
                        <button
                            className="button"
                            disabled={loader}
                            onClick={() => {
                                handlePreview();
                            }}
                        >
                            See Preview{" "}
                        </button>
                        <button
                            className="button"
                            disabled={loader}
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Apply Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomThemeModal;
