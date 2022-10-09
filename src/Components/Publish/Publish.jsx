import { useState } from "react";
import { useContext, useEffect } from "react";
import { uploadCard } from "../../API/uploadCard";
import Splash, { FullPageLoader } from "../../Screens/Splash/Splash";
import { TabContext } from "../TabWrapper/TabWrapper";
import styles from './publish.module.css'
import { Link } from "react-router-dom";
import cn from 'classnames'
const Publish = () => {
    const val = useContext(TabContext)
    const [loader, setLoader] = useState(true)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [data, setData] = useState({})
    console.log(loader)
    const PublishCard = async () => {
        const re = await uploadCard(val?.selectedTab?.cardDetails)
        if (re?.data?.success) {
            setLoader(false)
            setSuccess(true)
            setData(re?.data)
        }
        else {
            // setLoader(false)

            setLoader(false)
            setFailure(true)
        }
    }
    useEffect(() => {
        PublishCard()
    }, [])

    if (loader) {
        return (
            <>
                <FullPageLoader msg={"Creating your page.."} />
            </>
        )
    }
    if (success) {
        return (
            <>
                <Success data={data} />
            </>
        )
    }
    if (failure) {
        return (
            <>
                <Failure />
            </>
        )

    }

}

const Success = ({ data }) => {
    const rootUrl = window.location.origin

    return (
        <>
            <div className={styles.wrapper} >
                <div className={styles.success}>
                    <p className={styles.emoji}>🚀</p>
                    <h3>Woohoo!</h3>
                    <div className={styles.msg}>
                        <p>Page created successfully</p>
                        <p>getlandin.com/u/sdnuds</p>
                    </div>
                    <div className={styles.action}>
                        <button className={cn("button")}
                            onClick={() => {
                                window.open(`${rootUrl}/u/${data?.data?.url}`, "_blank")
                            }} >View my page</button>
                        <button className={cn("button")}>Copy URL</button>
                        <Link to="/dashboard"> <button className={cn("button")}>Go to Dashboard</button></Link>

                    </div>
                </div>

            </div>

        </>
    )
}


const Failure = () => {
    return (
        <>
            <div className={styles.wrapper} >
                <div className={styles.success}>
                    <p className={styles.emoji}>😟</p>
                    <h3>Oops!</h3>
                    <div className={styles.msg}>
                        <p>Unable to create page</p>
                        <p>Report this error at getlandin@gmail.com</p>
                    </div>
                    <div className={styles.action}>

                        <Link to="/dashboard"> <button className={cn("button")}>Go to Dashboard</button></Link>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Publish;