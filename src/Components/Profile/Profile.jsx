import styles from "./profile.module.css";
import cn from "classnames";
import { storage } from "../../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useContext } from "react";
import { TabContext } from "../TabWrapper/TabWrapper";
import { useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
const Profile = () => {
    const val = useContext(TabContext);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState({
        state: false,
        msg: "",
    });
    const [profileValues, setProfileValues] = useState({
        profilePicUrl: null,
        name: "",
        bio: "",
    });
    const profileImageUrl =
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";
    const handleChange = (e) => {
        setProfileValues({ ...profileValues, [e.target.name]: e.target.value });
    };
    const fileuploadClick = () => {
        setError({ state: false, msg: "" });
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
                    setProfileValues({
                        ...profileValues,
                        profilePicUrl: downloadURL,
                    });
                    setLoader(false);
                    e.target.value = null;
                });
            }
        );
    };

    useEffect(() => {
        if (val?.selectedTab?.cardDetails?.aboutUs) {
            setProfileValues(val?.selectedTab?.cardDetails?.aboutUs);
        }
    }, []);
    return (
        <>
            <div className={styles.profileContainer}>
                <p className={styles.head}>Write something about yourself!!</p>
                <div className={styles.profileArea}>
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
                            profileValues?.profilePicUrl
                                ? profileValues?.profilePicUrl
                                : profileImageUrl
                        }
                        className={styles.profileImage}
                    />
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id="fileuploadbutton"
                        accept="image/*"
                        onChange={fileChange}
                    />
                    {error?.state && (
                        <div className={styles.error}>
                            <p>{error.msg}</p>
                        </div>
                    )}
                    <button onClick={fileuploadClick} disabled={loader}>
                        Add Profile Image
                    </button>
                </div>
                <div className={styles.details}>
                    <input
                        type="text"
                        className={cn(styles.inputText, "textbox")}
                        placeholder="Your Name"
                        name="name"
                        onChange={handleChange}
                        value={profileValues?.name}
                    ></input>
                    <textarea
                        className={cn(
                            styles.inputText,
                            "textbox",
                            styles.textArea
                        )}
                        name="bio"
                        placeholder={"Short bio..."}
                        maxLength={140}
                        onChange={handleChange}
                        value={profileValues?.bio}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <input
                        type="button"
                        value={"Save and next"}
                        disabled={
                            profileValues?.name && profileValues.bio
                                ? false
                                : true
                        }
                        className={cn("button", styles.input)}
                        onClick={() => {
                            val.dispatch({
                                type: "UPDATE STATE",
                                data: { name: "aboutUs", value: profileValues },
                            });
                            val.dispatch({ type: "incrementTab" });
                        }}
                    ></input>
                </div>
            </div>
        </>
    );
};

export default Profile;
