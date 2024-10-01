import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "./authContext";

const useLogin = () => {
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();

    const login=async(username,password)=>{
        const success =handleInputError({username,password});
        if(!success) return ;
        setLoading(true);
        try {
            const res = await fetch("https://chatapp-vq6i.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"  // Ensure cookies are included
            });
            
            const data=await res.json();
            if(data.error){
                toast.error(data.error)
            }else{
            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
            }
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading,login};
}


const handleInputError=({username,password})=>{
    if( !username || !password ){
        toast.error("Please fill all the fields");
        return false;
    }  
    return true;
}

export default useLogin
