import styles from "./Header.module.css";
const Header = () => {
    const dynamicHeaderKey = {
        "/create": "create",
        "/edit": "edit",
    };

    const getHeaderValue = () => {
        const url = window.location.pathname;
        console.log(url);
        if (url in dynamicHeaderKey) {
            return dynamicHeaderKey[url];
        } else {
            return "landin";
        }
    };
    const url = window.location.pathname;

    return (
        <>
            <div
                className={styles.header}
                style={
                    window?.location?.pathname == "/"
                        ? { backgroundColor: "#54a1b8e3" }
                        : { backgroundColor: "white" }
                }
            >
                <h2 className="logo">{getHeaderValue()}</h2>
            </div>
        </>
    );
};

export default Header;
