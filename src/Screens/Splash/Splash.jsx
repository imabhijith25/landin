import { Children } from "react";
import styles from "./splash.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import { facts } from "../../Utils/facts";
import { useLocation, useParams } from "react-router";
import { useFetch } from "../../Hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useSearchParams } from "react-router-dom";
export const TokyoContext = createContext();
export const Splash = ({ children }) => {
    //initialise sample data here

    const { url, theme } = useParams();
    const [data, setData] = useState(null);
    const [params] = useSearchParams();
    console.log(params?.get("c"));
    const [showInfo, setShowInfo] = useState(false);
    let sampleData = {
        aboutUs: {
            name: "Amy",
            profilePicUrl: "/images/Sample/elane.png",
            bio: "Hi I am an optometrist and an influencer. I made this page using landin",
        },
        profilePicUrl: "/images/Sample/elane.png",
        link: [
            {
                title: "Checkout this video on butter chicken",
                url: "https://www.instagram.com/p/CetLQB_JasR/",
            },
            {
                title: "A video I wrote on Uncle Pai!!",
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
    const hideInfoShow = () => {
        setShowInfo(false);
    };

    useEffect(() => {
        if (url && status?.loading == false) {
            const parsedData = {
                aboutUs: JSON.parse(status?.data?.aboutUs),
                link: JSON.parse(JSON.parse(status?.data?.link)),
                post: JSON.parse(JSON.parse(status?.data?.post)),
                themeName: status?.data?.themeName,
                profilePicUrl: status?.data?.profilePicUrl,
            };

            setData(parsedData);
        } else if (theme) {
            if (theme == "custom") {
                console.log("custom");
                sampleData.themeName = "custom";
                console.log(params);
                sampleData.custom = {
                    color_one: params?.get("c1"),
                    color_two: params?.get("c2"),
                    bgImage: params?.get("bg"),
                };
                setData(sampleData);
            } else {
                sampleData.themeName = theme;
                setData(sampleData);
            }
        }
    }, [status, url]);

    useEffect(() => {
        if (localStorage?.getItem("visited")) {
            setShowInfo(false);
        } else {
            localStorage?.setItem("visited", true);
            setShowInfo(true);
        }
    }, []);

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
                    <div className={styles.splashContainer}>
                        {showInfo && <Info hideInfoShow={hideInfoShow} />}
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

const Info = ({ hideInfoShow }) => {
    return (
        <div
            className={styles.opaque}
            onClick={(e) => {
                e.stopPropagation();
                hideInfoShow();
            }}
        >
            <div className={styles.firstHalf}>
                <p>Tap left to move back</p>
            </div>
            <div className={styles.secondHalf}>
                <p>Tap right to move forward</p>
            </div>
        </div>
    );
};
