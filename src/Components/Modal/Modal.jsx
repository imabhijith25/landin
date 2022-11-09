import styles from "./Modal.module.css";
const Modal = ({ children }) => {
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modal_content}>{children}</div>
            </div>
        </>
    );
};

export default Modal;
