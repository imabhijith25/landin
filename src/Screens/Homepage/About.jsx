import styles from "./homepage.module.css";
import cn from "classnames";
const About = () => {
    return (
        <>
            <div className={styles.aboutContainer}>
                <div className={cn("container", styles.intro)}>
                    <div className={styles.about}>
                        <p>
                            {" "}
                            Made with ❤️ by <a href="/u/abhi">Abhijith</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
