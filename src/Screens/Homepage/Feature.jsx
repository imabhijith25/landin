import styles from "./homepage.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
const Feature = () => {
    const divs = [
        {
            head: "Customize with themes",
            body: "With many themes, you can customize the site to your liking.",
        },
        {
            head: "Show your latest achievement",
            body: "You can showcase your latest blog post or  your latest video by linking them on your bio.",
        },
        {
            head: "All your social media",
            body: "You can link all your social media urls so that all your links will be at one place.",
        },
    ];
    return (
        <>
            <div className={styles.featureContainer}>
                <div className={cn("container", styles.intro)}>
                    <h2>All your links at one place</h2>
                    <a href="#demo">See Demo</a>
                    <div className={styles.grid}>
                        {divs.map((item) => (
                            <div className={styles.card}>
                                <div className={styles.cardContainer}>
                                    <h3>{item?.head}</h3>
                                    <p>{item?.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className={styles.seeMore}>
                        <h3>Still not satisfied?</h3>
                        <button className={cn("button", styles.demoButton)}>
                            See a live Page
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default Feature;
