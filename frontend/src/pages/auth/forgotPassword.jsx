import {Link} from "react-router-dom"
import { useState } from "react";

const ForgotPassword=()=>{

    const [email,setEmail]=useState('');
    const [message, setMessage] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return(
        <>
            {/* <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-red-400 via-green to-yellow-300"> */}
            <div className="flex justify-center items-center w-full h-screen">
                <div className="flex flex-col gap-1 justify-center items-center w-[30%] bg-white/20 backdrop-blur-[3px] border-white-900 rounded-xl ring-1 ring-white/40 shadow-xl">
                    <h1 className="text-2xl mt-3 text-white/80">Forgot Password</h1>
                    <form className="flex flex-col justify-center items-center w-full gap-3 py-2" onSubmit={handleSubmit}>
                        <div className="w-full px-10">
                            <input className="w-full h-8 border rounded-xl pl-2 border-white/60 placeholder-white/50 text-white/80" type="text" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center space-y-1">
                            <div className="w-[80%] flex justify-center text-center">
                                <p className="text-white/80">A link will be send to you email address for reseting the Password </p>
                            </div>
                            {typeof message === 'string' && <p className="text-green-900 text-lg">{message}</p>}
                            <button className="w-[30%] bg-blue-500 rounded-xl h-8 active:bg-blue-400 text-center pt-1" type="submit">Send Link</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;