import { axiosInstance } from "../Utils/api";

export const deleteCard = async (url) => {
    let config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
    };
    try {
        const result = await axiosInstance.delete(
            `/card/deleteCard?url=${url}`,
            config,
            {
                data: { url },
            }
        );
        return result;
    } catch (err) {
        return err;
    }
};
