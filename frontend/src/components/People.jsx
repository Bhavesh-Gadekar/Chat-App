import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;
const People = ({ setclicked, users, setclickedUser, socket, setRecieverId,setChats }) => {

    const handleClick = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/home/message/read/` + id)
            setChats(response.data)
            // console.log(response.data)
            // socket.emit('join', id)
            setclicked(true);
            setRecieverId(id)
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(()=>{
    //     console.log(clickedUser);
    // },[clickedUser])

    return (
        <>
            <div className="flex justify-center items-center">
                <h1 className="text-lg font-bold mb-1">Users</h1>
            </div>
            {users.map((user, index) => {
                return (
                    <div key={index} className="w-full h-23 md:h-13 mb-2 ring-2 ring-gray-900 p-1 md:p-2 bg-white/0 backdrop-blur-[1px] rounded-xl text-center flex flex-col md:flex-row jusitify-center md:jusitify-start items-center shadow-2xl scrollbar-hide" onClick={() => {
                        setclickedUser(user);
                        handleClick(user._id);
                    }}>
                        <span>
                            <img src={user.image || "../../images/user.png"} className="w-10 h-10 object-cover bg-gray-700 cursor-pointer ring-2 ring-gray-900 rounded-full" />
                        </span>
                        <h1 className="text-md md:text-lg md:ml-6 font-bold">{user.firstname} {user.lastname}</h1>
                    </div>
                )
            })}
        </>
    )
}

export default People;