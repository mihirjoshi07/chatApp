import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "./authContext";

const useGetConversation = () => {
 const [loading,setLoading]=useState(false);
 const [conversations,setConversations]=useState([]);
 const {setAuthUser} = useAuthContext()   
 useEffect(()=>{
    const getConversations=async()=>{
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/user", {
                method: 'GET', // or POST, PUT, etc.
                credentials: 'include', // This ensures that cookies are sent along with the request
                headers: {
                  'Content-Type': 'application/json', // Depending on your backend's requirements
                  // Add any other custom headers if needed
                }
              });            const data=await res.json();
            if(data.error)
            {
                throw new Error(data.error);
            }
            setConversations(data);
        } catch (error) {  
            toast.error(error.message);
            if(error.message==="unauthorized -  no token found")
                setAuthUser(null)
            
        }
        finally{
            setLoading(false);
        }

    }
    getConversations();
 },[])
 return {loading,conversations};
}

export default useGetConversation
