import styles from "./dashboard.module.css"
import { Link } from "react-router-dom";
import { themeList } from "../../Utils/completeThemes";
import cn from 'classnames'
import { useState } from "react";
const DashView = () => {

    return (
        <>
            <div>


                {/* <CardGrid data={[themeList[0]]} /> */}
                <NoView />
            </div>


        </>
    );
}
const NoView = () => {
    const image = "https://images.unsplash.com/photo-1625316708582-7c38734be31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    return (
        <>
            <div className={styles.noView}>

                <div className={styles.noViewWrap}>
                    <img src={image} alt={"No View"}></img>
                    <h3>There are no pages yet..</h3>
                    <p>The pages that you create will appear here</p>
                    <p><Link to="/create">Click here</Link> to create one</p>
                </div>
            </div>


        </>
    )
}



const CardGrid = ({ data }) => {
    const [modal, setModal] = useState(false)
    return (
        <>
            {modal && <DashModal />}
            <div className={styles.pagesHeader}>
                <h3>My Pages</h3>
            </div>
            <div className={styles.gridWrapper}>
                <div className={styles.gridArea}>
                    {data?.map(item => (
                        <div className={styles.cardWrapper}>
                            <div className={styles.card} onClick={() => {
                                setModal(true)
                            }}>
                                <img src={item?.location} alt="my_items" />
                            </div>

                        </div>
                    ))}

                </div>

            </div>
            <div className={styles.pagesHeader}>
                <p>You can create a maximum of 5 Pages</p>
            </div>

        </>
    )
}

const DashModal = () => {
    return (
        <>
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.heading}>
                        <p>u/Narendra</p>
                    </div>
                    <p>Choose your action</p>

                    <div className={cn(styles.actionButton)}>
                        <input type="button" className="button" value="View Page"></input>
                        <input type="button" className="button" value="Edit Page"></input>
                        <input type="button" className="button" value="Delete Page"></input>

                    </div>
                </div>



            </div>


        </>
    )
}


export default DashView;