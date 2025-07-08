import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

const Signup=()=>{

    const navigate=useNavigate();
    const[firstname,setFirstname]=useState('');
    const[lastname,setLastname]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [message,setMessage]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!firstname || !lastname || !email || !password) {
            return setMessage("Fields Should not be Empty !")
        }
        try{
            const response= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,{firstname,lastname,email,password})
            console.log(response.data);
            setMessage('');
            navigate('/login');
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        {/* <div className="flex justify-center items-center w-full h-screen bg-blue-100 bg-gradient-to-br from-red-400 via-green to-yellow-300"> */}
        <div className="flex flex-col space-y-2 justify-center items-center w-full h-screen">
            <h1 className="text-white text-2xl">Create your account</h1>
            <div className="flex flex-col gap-2 justify-center items-center w-[30%] bg-white/15 backdrop-blur-[3px] ring-1 ring-white rounded-xl ">
                <h1 className="text-2xl mt-1 text-white">Sign-up</h1>
                <form className="flex flex-col justify-center items-center w-full gap-3 py-3" onSubmit={handleSubmit}>
                    <div className="w-full px-10">
                        <h4 className="text-lg ml-2 text-white">Firstname :-</h4>
                        <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter firstname" name="firstname" onChange={(e)=>{setFirstname(e.target.value)}}/>
                    </div>
                    <div className="w-full px-10">
                        <h4 className="text-lg ml-2 text-white">Lastname :-</h4>
                        <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter lastname" name="lastname" onChange={(e)=>{setLastname(e.target.value)}}/>
                    </div>
                    <div className="w-full px-10">
                        <h4 className="text-lg ml-2 text-white">Email :-</h4>
                        <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter Email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="w-full px-10">
                        <h4 className="text-lg ml-2 text-white">Password :-</h4>
                        <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter Password" name="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        {typeof message === 'string' && <p className="text-red-600">{message}</p>}
                        <button className="w-[30%] bg-blue-500 rounded-xl mx-35 h-8 active:bg-blue-400 my-1" type="submit">Sign-up</button>
                        <div className="w-full flex justify-center ">
                            <p className="text-white">Have a account ?</p>
                            <Link to='/login' className="text-blue-900 ml-1 text-white underline">Sign-in</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Signup;