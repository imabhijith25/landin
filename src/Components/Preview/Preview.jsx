import useWidth from "../../Hooks/useWidth";
const Preview = () => {
    const windowWidth = useWidth();
    return (
        <>
            <div
                style={{
                    width: windowWidth < 800 ? "100%" : "80%",
                }}
            ></div>
        </>
    );
};

export default Preview;
