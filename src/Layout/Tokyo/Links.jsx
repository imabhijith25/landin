
import styles from "./tokyo.module.css"
const Links = () => {
    const sampleLinks = [
        {
            name: "A sample link here. Life is nothing but a pointless mirage",
            href: "#"
        },
        {
            name: "A sample link here",
            href: "#"
        },
        {
            name: "A sample link here",
            href: "#"
        },
    ]
    return (
        <>


            <div className={styles.aboutContainer}>
                {sampleLinks.map(item => (
                    <div className={styles.links}>
                        {item?.name}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Links;