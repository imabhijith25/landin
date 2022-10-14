import { Children } from "react";
import styles from "./splash.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import { facts } from "../../Utils/facts";
import { useParams } from "react-router";
import { useFetch } from "../../Hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
export const TokyoContext = createContext();
export const Splash = ({ children }) => {
    //initialise sample data here
    const { url } = useParams();
    const [data, setData] = useState(null);
    let sampleData = {
        aboutUs: {
            name: "Amy",
            profilePicUrl: "/images/Sample/elane.png",
            bio: "Hi I am an optometrist and an influencer",
        },
        profilePicUrl: "/images/Sample/elane.png",
        link: [
            {
                title: "Checkout this video on butter chicken",
                url: "https://www.instagram.com/p/CetLQB_JasR/",
            },
            {
                title: "Uncle Pai!!",
                url: "https://www.instagram.com/p/CeGoEt-J0Ze/",
            },
            {
                title: "Found a video on Amul",
                url: "https://www.instagram.com/p/Cihn-0pJqlM/",
            },
        ],
        post: [
            {
                title: "linkedIn",
                url: "https://linkedin.com",
            },
            {
                title: "Twitter",
                url: "https://twitter.com",
            },
            {
                title: "Instagram",
                url: "https://instagram.com",
            },
        ],
        themeName: "tokyo_night",
    };
    const [status] = useFetch(`/card/getCard?url=${url}`);
    console.log(status);
    useEffect(() => {
        if (url && status?.loading == false) {
            const parsedData = {
                aboutUs: JSON.parse(status?.data?.aboutUs),
                link: JSON.parse(JSON.parse(status?.data?.link)),
                post: JSON.parse(JSON.parse(status?.data?.post)),
                themeName: status?.data?.themeName,
                profilePicUrl: status?.data?.profilePicUrl,
            };
            console.log(parsedData);
            setData(parsedData);
        } else {
            setData(sampleData);
        }
    }, [status, url]);
    if (status?.loading) {
        return (
            <>
                <div>
                    <FullPageLoader />
                </div>
            </>
        );
    } else {
        return (
            <>
                <TokyoContext.Provider value={data}>
                    <div>
                        {children}
                        {/* <FullPageLoader /> */}
                    </div>
                </TokyoContext.Provider>
            </>
        );
    }
};
export const FullPageLoader = ({ msg }) => {
    const random = Math.floor((Math.random() * 10) % 9);
    return (
        <>
            <div className={styles.fullPage}>
                <div className={styles.loader}>
                    <PuffLoader color="#7684a5" loading={true} size={65} />
                    {!msg ? <p>{facts[random]}</p> : <p>{msg}</p>}
                </div>
            </div>
        </>
    );
};
