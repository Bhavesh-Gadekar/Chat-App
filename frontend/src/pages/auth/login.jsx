import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { useUser } from "../../context/contextProvider.jsx";

axios.defaults.withCredentials=true;
const Login=()=>{

    const {setIsLoggedIn}=useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            if(!email || !password){
                return setMessage("Enter all fields");
            }
            const response= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{email,password})
            if(response.data === "No user found !!"){
                setMessage("No user found !!");
                return
            }
            if(response.data==="Invalid Credentials !!"){
                setMessage("Invalid Credentials !!");
                return
            }
            // setMessage(response.data);
            setIsLoggedIn(true);
            navigate('/home')
        }catch(error){
            console.log(error);
        }
    }

    return(
        <>
            {/* <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-red-400 via-green to-yellow-300"> */}
            <div className="flex flex-col justify-center items-center space-y-2 w-full h-screen">
                <h1 className="text-white text-3xl">Welcome back</h1>
                <h1 className="text-white text-2xl">Sign-in to your account</h1>
                <div className="flex flex-col gap-1 justify-center items-center w-[30%] bg-white/15 backdrop-blur-[3px] border-white-900 rounded-xl ring-1 ring-white/80 shadow-xl">
                    <h1 className="text-2xl mt-3 text-white">Sign-in</h1>
                    <form className="flex flex-col justify-center items-center w-full gap-3 py-2" onSubmit={handleSubmit}>
                        <div className="w-full px-10">
                            <h4 className="text-lg ml-2 text-white">Email :-</h4>
                            <input className="w-full h-8 border border-white/60 rounded-xl pl-2 placeholder-white/50 text-white/80" type="text" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="w-full px-10">
                            <h4 className="text-lg ml-2 text-white">Password :-</h4>
                            <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center space-y-1">
                            <Link to={'/forgotpassword'} className="text-blue-900 mb-2 text-white underline">Forgot Password ?</Link>
                            {typeof message === 'string' && <p className="text-red-600">{message}</p>}
                            <button className="w-[30%] bg-blue-500 rounded-xl h-8 active:bg-blue-400" type="submit">login</button>
                            <div className="w-full flex justify-center ">
                                <p className="text-white">Already have an account ?</p>
                                <Link to='/signup' className="text-white underline ml-1">Sign-up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;