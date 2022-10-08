import styles from "./Header.module.css"
const Header = () => {

    const dynamicHeaderKey = {
        "/create": "create",
        "/edit": "edit"
    }

    const getHeaderValue = () => {
        const url = window.location.pathname
        if (url in dynamicHeaderKey) {
            return dynamicHeaderKey[url]
        }
        else {
            return "landin"
        }
    }
    const url = window.location.pathname

    return (
        <>
            <div className={styles.header}>
                <h2 className="logo">{getHeaderValue()}</h2>
            </div>

        </>
    );
}

export default Header;