import { useRef, useState } from "react";
import People from "../../components/People.jsx";
import Logout from '../auth/logout.jsx'
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/contextProvider.jsx";
import Chat from "../../components/Chat.jsx";


axios.defaults.withCredentials = true;
const Home = ({socket}) => {

    const { user } = useUser();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [profilepic,setProfilePic]=useState(null);
    const [file, setfile] = useState(null);
    const [clickedUser, setclickedUser] = useState({});
    const [clicked, setclicked] = useState(false);
    const [setting, setSetting] = useState(false);
    const [deleteaccount, setDeleteaccount] = useState(false);
    const [recieverId,setRecieverId]=useState('');
    const [chats,setChats]=useState([]);

    const fileInputRef = useRef();

    const handleImageClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return
        if (selectedFile) {
            console.log("Selected file: ", selectedFile);
        }
        const reader=new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload=async()=>{
            const base64image=reader.result;

            setfile(base64image);
        }

        const formdata = new FormData();
        formdata.append('file', selectedFile)
        formdata.append("upload_preset", "chat_app"); // Set this in your Cloudinary settings
        formdata.append("cloud_name", "djm3hmjk2");
        const response = await axios.post(`https://api.cloudinary.com/v1_1/djm3hmjk2/image/upload`, formdata, {
            withCredentials: false, // This prevents the CORS issue
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        const updloadedUrl=response.data.secure_url
        setProfilePic(updloadedUrl);
        const image=await axios.post(`${import.meta.env.VITE_SERVER_URL}/home/updatepic`,{profilepic:updloadedUrl})
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/home`)
            if (response.data === 'unauthorized') {
                navigate('/login');
            }
            console.log(response);
        }
        fetchUser();
        const fetchUsers = async () => {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/home/getusers`)
            // console.log(response.data);
            setUsers(response.data);
        }
        fetchUsers();
        const getProfilepic=async()=>{
            const response=await axios.get(`${import.meta.env.VITE_SERVER_URL}/home/getuserpic`)
            setProfilePic(response.data);
        }
        getProfilepic();
    }, [])
    return (
        <>
            <div className="flex justify-start items-center w-full space-x-3 p-3 h-screen overflow-y-auto">
                <div className="flex flex-col justify-start p-1 items-center w-[30%] h-full md:w-[24%] bg-white/0 backdrop-blur-[1px] border-white-900 rounded-xl ring-1 ring-white shadow-xl scrollbar-hide">
                    <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center pr-1 mt-1 ring-1 ring-white/50 rounded-xl md:rounded-full bg-white/80 backdrop-blur-[2px]">
                        <div className="w-10 h-10 rounded-full bg-gray-900 text-center m-1">
                            <img src={file || profilepic || "../../../images/user.png"} className="w-full h-full rounded-full object-cover cursor-pointer ring-2 ring-gray-900 rounded-full"/>
                        </div>
                        <div className="w-[75%] text-center font-bold text-xl">{`${user?.user?.firstname ?? ''} ${user?.user?.lastname ?? ''}`}</div>
                        <img src="../../../images/gear.png" className="w-7 h-7" onClick={() => { setSetting(true) }} />
                    </div>
                    <div className="mt-2 p-2 w-full h-full bg-white/60 ring-1 rounded-xl ring-white/70 overflow-y-auto scrollbar-hide no-scrollbar">
                        <People setChats={setChats} socket={socket} setRecieverId={setRecieverId} setclicked={setclicked} users={users} setUsers={setUsers} setclickedUser={setclickedUser} clickedUser={clickedUser} />
                    </div>
                </div>
                {clicked ? (
                    <>
                        <Chat socket={socket} chats={chats} setChats={setChats} recieverId={recieverId} setclicked={setclicked} clickedUser={clickedUser} />
                    </>
                ) : (
                    <>
                        <div className="flex flex-col justify-center items-center w-[70%]">
                            <div>
                                <h1 className="text-white text-4xl">🤗 Welcome {user?.user?.firstname ?? ''} 🤗</h1>
                            </div>
                            <h1 className="text-4xl text-white text-center p-[10%]">Start Your Conversation !!</h1>
                        </div>
                    </>
                )}
                {setting ? (
                    <>
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/10 backdrop-blur-[4px]">
                            <div className="w-[48%] h-[75%] bg-white/60 backdrop-blur-[3px] rounded-xl ring-1 ring-white/90 ml-5">
                                <div className="flex justify-center items-center p-2">
                                    <h1 className="text-2xl w-[56%] text-end">Profile</h1>
                                    <h1 className="text-2xl w-[44%] text-end pr-2" onClick={() => { setSetting(false) }}>X</h1>
                                </div>
                                <div className="flex flex-col space-y-5 justify-center items-center">
                                    <h1>Your profile info</h1>
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="w-20 h-20 bg-white rounded-full ring-2 ring-gray-900">
                                            {/* Src is remaing here */}
                                            <img src={file || profilepic || "../../../images/user.png"} alt="profile" className="w-full h-full rounded-full object-cover cursor-pointer" onClick={handleImageClick} />
                                            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                                        </div>
                                        <h1 className="text-center pl-4">To change Profile-Pic tap on icon</h1>
                                    </div>
                                    <div className="flex flex-col space-y-5 justify-center items-center w-full pl-8">
                                        <div className="w-full flex justify-center items-center">
                                            <h1 className="pr-1">firstname :</h1>
                                            <input type="text" defaultValue={user?.user?.firstname ?? ''} placeholder="First Name" className="w-[70%] ring-1 ring-white/80 rounded-xl h-8 pl-2" />
                                        </div>
                                        <div className="w-full flex flex justify-center items-center">
                                            <h1 className="pr-1">lastname :</h1>
                                            <input type="text" defaultValue={user?.user?.lastname ?? ''} placeholder="Last Name" className="w-[70%] ring-1 ring-white/80 rounded-xl h-8 pl-2" />
                                        </div>
                                        <div className="w-full flex justify-center items-center">
                                            <h1 className="pr-8">Email :</h1>
                                            <input type="text" defaultValue={user?.user?.email ?? ''} placeholder="Email Address" className="w-[70%] ring-1 ring-white/80 rounded-xl h-8 pl-2" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full px-3">
                                        <Logout />
                                        <button className="p-2 px-3 bg-red-500 active:bg-red-400 rounded-xl" onClick={() => { setDeleteaccount(true) }}>Delete Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                {deleteaccount ? (
                    <>
                        <div className="fixed inset-0 z-51 w-full h-screen backdrop-blur-[3px] flex justify-center items-center">
                            <div className="w-[30%] h-[30%] bg-white backdrop-blur-[3px] rounded-xl ring-1 ring-white/90 ml-2 flex flex-col justify-center items-center">
                                <h1 className="text-xl">Confirm Deletion of Account ?</h1>
                                <h1 className="text-xl">There's no way Back !!</h1>
                                <div className="flex justify-around items-center w-full mt-5">
                                    <button className="p-2 px-3 bg-gray-500 active:bg-gray-400 rounded-xl" onClick={() => { setDeleteaccount(false) }}>cancel</button>
                                    <button className="p-2 px-3 bg-red-500 active:bg-red-400 rounded-xl">Delete</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (<>
                </>)}
            </div>
        </>
    )
}

export default Home;