import { useContext } from "react";
import { EditorContext } from "../../Screens/Editor/Editor";
import styles from "./profile.module.css";
const ProfileSelector = () => {
    const editorContextvalues = useContext(EditorContext);
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
    return (
        <div className={styles.profileSelector}>
            <h4>Your Profile</h4>
            <p>Edit your profile card with latest details</p>
            <div className={styles.editContainer}>
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
