import { useContext } from "react";
import styles from "./social.module.css"
import { SocialContext } from "./Social";
import { socialList } from "./socialList";
const SocialCards = ({ key, index }) => {
    const socialContextValue = useContext(SocialContext)

    const handleTitleChange = (e) => {
        socialContextValue.socialDispatch({
            type: "EDIT VALUE", data: {
                index,
                title: e.target.value
            }
        })

    }

    const handleLinkChange = (e) => {
        socialContextValue.socialDispatch({
            type: "EDIT LINK", data: {
                index,
                url: e.target.value
            }
        })

    }

    return (
        <div className={styles.card}>
            {index != 0 &&
                <div className={styles.closeButton}
                    onClick={() => {
                        socialContextValue.socialDispatch({
                            type: "CLOSE",
                            data: {
                                index
                            }
                        })
                    }}
                >

                    &#10006;

                </div>

            }

            <select onChange={handleTitleChange}
                value={socialContextValue.socialValue?.[index]?.title}
            >
                {socialList.map(item => (
                    <option>{item}</option>
                ))}
            </select>
            {/* <input type="text" placeholder="Title of your latest blog or recipe.." value={socialContextValue.socialValue?.[index]?.title} onChange={handleTitleChange}></input> */}
            <input type="text" placeholder="Link to your work" value={socialContextValue.socialValue?.[index]?.url} onChange={handleLinkChange}></input>
        </div>
    );
}

export default SocialCards;