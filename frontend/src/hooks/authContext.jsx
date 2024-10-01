import { createContext, useContext } from "react";
import { useState } from "react";
export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider=({children})=>{

    const getAuthUser = () => {
        const user = localStorage.getItem("chat-user");
        if (user) {
          try {
            return JSON.parse(user); // Parse only if it's valid
          } catch (error) {
            console.error("Invalid JSON in localStorage:", error);
            return null; // Return null if parsing fails
          }
        }
        return null; // Return null if no user in localStorage
      };
      const [authUser, setAuthUser] = useState(getAuthUser());
    
    return(
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}

