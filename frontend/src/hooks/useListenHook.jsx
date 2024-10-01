import { useEffect } from "react";
import  useConversation  from  "../zustand/useConversation";
import { useSocketContext } from "./SocketContext";
import notificationSound from "../assets/sound/notification.mp3"
const useListenHook=()=>{
    const {socket} =useSocketContext();
    const {messages,setMessages} = useConversation();
    
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages,newMessage])
        })
        return ()=>socket?.off("newMessage")
},[socket,setMessages,messages])
}

export default useListenHook;