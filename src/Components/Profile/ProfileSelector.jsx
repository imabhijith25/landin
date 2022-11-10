import { useContext } from "react";
import { EditorContext } from "../../Screens/Editor/Editor";
import { storage } from "../../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import styles from "./profile.module.css";
import cn from "classnames";
import PuffLoader from "react-spinners/PuffLoader";
const ProfileSelector = () => {
    const editorContextvalues = useContext(EditorContext);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({
        state: false,
        msg: "",
    });
    const socials = [
        "Twitter",
        "Dribble",
        "Github",
        "Instagram",
        "LinkedIn",
        "Twitch",
        "Youtube",
    ];

    const work = ["Email", "Location"];

    const handleChange = (e) => {
        editorContextvalues.dispatch({
            type: "UPDATE_PROFILE_VALUES",
            data: {
                key: e.target.name,
                value: e.target.value,
            },
        });
    };

    const handleSocialChange = (e) => {
        editorContextvalues.dispatch({
            type: "UPDATE_PROFILE_SOCIAL_VALUES",
            data: {
                key: e.target.name,
                value: e.target.value,
            },
        });
    };

    const fileuploadClick = () => {
        // setError({ state: false, msg: "" });
        const fileButton = document.getElementById("fileuploadbutton");
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
        if (file?.size / 1024 / 1024 > 5) {
            e.target.value = null;
            setError({ state: true, msg: "File size exceeded 5MB" });
            setLoader(false);
            return;
        }
        const storageRef = ref(storage, `files/${file.name}`);
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
                    editorContextvalues.dispatch({
                        type: "UPDATE_PROFILE_VALUES",
                        data: {
                            key: "profilePic",
                            value: downloadURL,
                        },
                    });
                    setLoader(false);
                    e.target.value = null;
                });
            }
        );
    };

    return (
        <div className={styles.profileSelector}>
            <h4>Your Profile</h4>
            <p>Edit your profile card with latest details</p>
            <div className={styles.editContainer}>
                <div className={styles.uploadContainer}>
                    <div className={styles.imageCropper}>
                        <img
                            className={styles.img}
                            src={
                                editorContextvalues?.state?.preview?.profile
                                    ?.profilePic
                            }
                            style={{
                                border: "2px solid rgb(95, 94, 94)",
                                objectFit: "cover",
                            }}
                            alt="profile"
                        ></img>
                    </div>
                    <input
                        type="file"
                        id="fileuploadbutton"
                        accept="image/*"
                        onChange={fileChange}
                        style={{ display: "none" }}
                    ></input>
                    <button
                        className={cn("toolButton")}
                        onClick={fileuploadClick}
                        disabled={loader}
                    >
                        {loader ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <PuffLoader
                                    size={18}
                                    color="white"
                                ></PuffLoader>
                            </div>
                        ) : (
                            "Change display image"
                        )}
                    </button>
                </div>
                <div className={styles.info}>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={
                            editorContextvalues?.state?.preview?.profile?.name
                        }
                    ></input>
                </div>

                <div className={styles.info}>
                    <label>Your Bio</label>
                    <textarea
                        name="bio"
                        onChange={handleChange}
                        value={
                            editorContextvalues?.state?.preview?.profile?.bio
                        }
                    ></textarea>
                </div>
                <div className={styles.be}>
                    <b>
                        {" "}
                        <p>Work</p>
                    </b>
                </div>
                <p>Add your work details</p>
                <br />
                {work.map((item, index) => (
                    <div className={styles.info} key={index}>
                        <label>{item}</label>
                        <input
                            type="text"
                            name={item}
                            value={
                                editorContextvalues?.state?.preview?.profile?.[
                                    item
                                ]
                            }
                            onChange={handleChange}
                        ></input>
                    </div>
                ))}
                <div className={styles.be}>
                    <b>
                        {" "}
                        <p>Social</p>
                    </b>
                </div>
                <p>Add your social media links</p>
                <br />
                {socials.map((item, index) => (
                    <div className={styles.info} key={index}>
                        <label>{item}</label>
                        <input
                            value={
                                editorContextvalues?.state?.preview?.profile
                                    ?.social[item]
                            }
                            type="text"
                            name={item}
                            onChange={handleSocialChange}
                        ></input>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSelector;
