import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useUser } from '../../context/contextProvider.jsx';

axios.defaults.withCredentials=true;
const Logout=()=>{

    const {setIsLoggedIn}=useUser();
    const naviagte=useNavigate();

    const handeClick= async (e)=>{
        try{
            const response=await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`)
            // console.log(response)
            setIsLoggedIn(false);
            naviagte('/login');
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <button className="p-2 px-3 bg-blue-600 active:bg-blue-500 rounded-xl" onClick={handeClick}>Logout</button>
        </>
    )
}

export default Logout;