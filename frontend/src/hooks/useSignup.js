import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./authContext";
    const useSignup = () => {
    const {setAuthUser}=useAuthContext();
    const [loading,setLoading]=useState(false);
    const signup=async({fullName,username,password,confirmPassword,gender})=>{
           const success =handleInputError({fullName,username,password,confirmPassword,gender});
           if(!success) return ;
            setLoading(true);
           try {
                const res=await fetch("https://chatapp-vq6i.onrender.com/api/signup",{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify({fullName,username,password,confirmPassword,gender}),
                         credentials: "include"
                })

                const data=await res.json();
                if(data.error)
                    toast.error(data.error)
                localStorage.setItem("chat-user",JSON.stringify(data));
                setAuthUser(data);
                
                
           } catch (error) {
                toast.error(error.message)  
           }finally{
                setLoading(false);
           }    


    }
    return{loading,signup}
}

const handleInputError=({fullName,username,password,confirmPassword,gender})=>{
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields");
        return false;
    }
        
    if(password!==confirmPassword)
    {
        toast.error("Passwords do not match")
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be atleast 6 characters");
        return false;
    }
    return true;
}

export default useSignup