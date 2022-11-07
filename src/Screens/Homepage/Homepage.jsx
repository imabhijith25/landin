import { useEffect } from "react";
import About from "./About";
import Banner from "./Banner";
import Demo from "./Demo";
import Feature from "./Feature";
import styles from "./homepage.module.css";
const Homepage = () => {
    useEffect(() => {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(
                process.env.REACT_APP_API_BASE_URL + "/user/startLandin"
            );
        }
        console.log("Started");
    }, []);
    return (
        <>
            <div>
                <Banner />
                <Feature />
                <Demo />
                <About />
            </div>
        </>
    );
};

export default Homepage;
