import { useEffect, useState } from "react";
const useWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, []);
    return windowWidth;
};

export default useWidth;
