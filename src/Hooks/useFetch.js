import { useEffect, useState } from "react"
import { axiosInstance } from "../Utils/api"

export const useFetch = (urls) => {
    const [status, setStatus] = useState({
        loading:true,
        data:[],
        error:null

    })
    let config = {
        headers:{
            authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    }
    const fetchData = async ()=>{

        try{
           const resp = await axiosInstance.get(urls ,config)
           if(resp?.data?.success){
            setStatus({loading:false,data:resp?.data?.data,error:null})
           }
        }
        catch(err){
            setStatus({loading:false,data:[],error:err})
        }
    }
    useEffect(() => {

        fetchData();
    }, [])

    return [status]
}