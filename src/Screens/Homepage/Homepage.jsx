import About from "./About";
import Banner from "./Banner";
import Demo from "./Demo";
import Feature from "./Feature";
import styles from "./homepage.module.css";
const Homepage = () => {
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
