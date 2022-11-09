import styles from "./profile.module.css";
import cn from "classnames";
import { storage } from "../../Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { EditorContext } from "../../Screens/Editor/Editor";
const Profile = () => {
    const editorContextvalues = useContext(EditorContext);
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

    return (
        <>
            <div className={styles.profileContainer}>
                <div className={styles.flexer}>
                    <div className={styles.imageCropper}>
                        <img
                            src={
                                editorContextvalues?.state?.preview?.profile
                                    ?.profilePic
                            }
                            alt="profile"
                            className={styles.img}
                        ></img>
                    </div>

                    <div className={styles.details}>
                        <h2>
                            {editorContextvalues?.state?.preview?.profile?.name}
                        </h2>
                        <p>
                            {editorContextvalues?.state?.preview?.profile?.bio}
                        </p>

                        <div className={styles.socialHolder}>
                            {Object.keys(
                                editorContextvalues?.state?.preview?.profile
                                    ?.social
                            ).map((item, index) => (
                                <img src={`/images/social/${item}.svg`}></img>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
