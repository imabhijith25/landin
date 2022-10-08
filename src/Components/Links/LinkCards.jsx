import { useContext } from "react";
import styles from "./links.module.css"
import { LinkContext } from "./Links";
const LinkCards = ({ key, index }) => {
    const cardContextValue = useContext(LinkContext)

    const handleTitleChange = (e) => {
        cardContextValue.linkDispatch({
            type: "EDIT VALUE", data: {
                index,
                title: e.target.value
            }
        })

    }

    const handleLinkChange = (e) => {
        cardContextValue.linkDispatch({
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
                        cardContextValue.linkDispatch({
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

            <input type="text" placeholder="Title of your latest blog or recipe.." value={cardContextValue.linkValue?.[index]?.title} onChange={handleTitleChange}></input>
            <input type="text" placeholder="Link to your work" value={cardContextValue.linkValue?.[index]?.url} onChange={handleLinkChange}></input>
        </div>
    );
}

export default LinkCards;