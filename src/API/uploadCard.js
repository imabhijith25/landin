import { axiosInstance } from "../Utils/api";
export const uploadCard = async (payload) => {
    const profileImageUrl = "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
    const body = {
        url: payload.url,
        profilePicUrl: payload?.profilePicUrl ? payload?.profilePicUrl : profileImageUrl,
        themeName: payload?.themeName,
        link: JSON.stringify(payload?.link),
        aboutUs: JSON.stringify(payload?.aboutUs),
        post: JSON.stringify(payload.post)
    }
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }
    try {
        const result = await axiosInstance.post("/card/addCard", body, config)
        return result
    }
    catch (err) {
        return err
    }


}