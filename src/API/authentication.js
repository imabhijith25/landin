
import { axiosInstance } from "../Utils/api";


export const register = async (payload) => {
    try {
        const result = await axiosInstance.post("/user/addUser", payload)
        return result
    }
    catch (err) {
        return err
    }

}