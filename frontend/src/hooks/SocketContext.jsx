import { createContext, useContext, useEffect, useState } from "react";

export const SocketContext=createContext();

import { useAuthContext } from "./authContext";
import io from "socket.io-client"

export const useSocketContext=()=>{
    return useContext(SocketContext)    
}

// eslint-disable-next-line react/prop-types
export const SocketContextProvider=({children})=>{
    const {authUser}=useAuthContext();
    const [socket,setSocket]=useState();
    const [onlineUsers,setOnlineUsers]=useState();
    useEffect(()=>{
        
    if(authUser)
        {
            const socket=io("https://chatapp-vq6i.onrender.com/",{
                query:{
                    userId:authUser._id,
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return () => socket.close();
        }
    },[authUser])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}