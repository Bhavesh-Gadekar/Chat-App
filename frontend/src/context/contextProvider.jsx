import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

const userContext=createContext();
axios.defaults.withCredentials=true;
const ContextProvider=({children})=>{

    const [user,setUser]=useState('');
    const [isloggedin,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        try{
        const fetchUser=async ()=>{
            const response=await axios.get(`${import.meta.env.VITE_SERVER_URL}/home/getuser`)
            // console.log(response.data);
            setUser(response.data);
        }
            fetchUser();
        }catch(error){
            setUser('');
            console.log(error);
        }
    },[isloggedin])
    return(
        <userContext.Provider value={{user,setUser,setIsLoggedIn}}>{children}</userContext.Provider>
    )
}

export const useUser=()=>useContext(userContext);
export default ContextProvider;