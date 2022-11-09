import styles from "./preview.module.css";
import { EditorContext } from "../../Screens/Editor/Editor";
import { useContext } from "react";
const AddWidget = () => {
    const editorContextvalues = useContext(EditorContext);
    const widgets = [
        {
            name: "Images",
            description:
                "Add images to your page to share the greatest moments of your life",
            url: "/images/Icons/image.svg",
        },
        {
            name: "Links",
            description:
                "Add links to your works. It could be an article, recipe or your latest dance video",
            url: "/images/Icons/link.svg",
        },
    ];
    const toggleModal = () => {
        editorContextvalues.dispatch({
            type: "TOGGLE_MODAL_WIDGET",
        });
    };
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.closeButton} onClick={toggleModal}>
                    &#10006;
                </div>
                <h4>Add Custom Widgets</h4>
                {widgets?.map((item, index) => (
                    <div key={index} className={styles.widgetWrap}>
                        <img src={item?.url} height={48} width={48} />
                        <div className={styles.details}>
                            <h5>{item?.name}</h5>
                            <p>{item?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AddWidget;
