import styles from "./homepage.module.css";
import cn from "classnames";
import ReactPlayer from "react-player";
const Demo = () => {
    return (
        <>
            <div
                className={styles.demoContainer}
                id="demo"
                style={{
                    backgroundImage: `url(${"/images/demoBg.svg"})`,
                    backgroundPosition: "100% 100%",
                    backgroundSize: "cover",
                }}
            >
                <div className={cn("container", styles.intro)}>
                    <h2>See the Demo</h2>
                    <p>Because a video is worth a thousand words</p>
                    <div className={styles.video}>
                        <ReactPlayer
                            url="/images/demo.mp4"
                            playing={false}
                            controls
                            width={"100%"}
                            height={"100%"}
                        />
                    </div>
                    <div className={styles.seeMore}>
                        <h3>Still not satisfied?</h3>
                        <button
                            className={cn("button", styles.demoButton)}
                            onClick={() => {
                                window.open(
                                    `${window.location.origin}/amy/tokyo_love`,
                                    "_blank"
                                );
                            }}
                        >
                            See a live Page
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Demo;
