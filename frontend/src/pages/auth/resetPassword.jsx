import { useNavigate,useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ResetPassword=()=>{

    const navigate = useNavigate();
    const {id,token}= useParams();
    const [email, setEmail] = useState('');
    const[password,setPassword]=useState('');
    const [message, setMessage] = useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return(
        <>
            <div className="flex justify-center items-center w-full h-screen bg-gradient-to-br from-red-400 via-green to-yellow-300">
                <div className="flex flex-col gap-1 justify-center items-center w-[30%] bg-white/20 backdrop-blur-xl border-white-900 rounded-xl ring-1 ring-white/40 shadow-xl">
                    <h1 className="text-2xl mt-3">Reset Password</h1>
                    <form className="flex flex-col justify-center items-center w-full gap-3 py-2" onSubmit={handleSubmit}>
                        <div className="w-full px-10">
                            <h4 className="text-lg ml-2">Email :-</h4>
                            <input className="w-full h-8 border rounded-xl pl-2" type="text" placeholder="Enter Email" name="email" onChange={(e) => { setEmail(e.target.value) }} value={email}/>
                        </div>
                        <div className="w-full px-10">
                            <h4 className="text-lg ml-2">Reset Password :-</h4>
                            <input className="w-full h-8 border rounded-xl pl-2" type="text" placeholder="Enter Password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center space-y-1">
                            {typeof message === 'string' && <p className="text-red-600">{message}</p>}
                            <button className="w-[30%] bg-blue-500 rounded-xl h-8 active:bg-blue-400" type="submit">Set Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;