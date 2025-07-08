import { useState } from "react";
import { useUser } from "../context/contextProvider";
import { useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const Chat = ({ setclicked,clickedUser,recieverId,setChats,chats,socket}) => {

    const [message,setMessage]=useState('');
    const {user}=useUser();
    const userId=user.userId;

    const handleSend=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post(`${import.meta.env.VITE_SERVER_URL}/home/message/send/`+recieverId,{content:message})
            // console.log(response.data)
            setChats([...chats,{content:message,senderId:userId}])
            setMessage('');
        }catch(error){
            console.log(error);
        }
    }

    // useEffect(()=>{
    //     console.log(userId);
    // },[]);

    useEffect(() => {
    // Function to handle new incoming messages
    const handleNewMessages = (message) => {
        // console.log("New message received:", message);
        // Add the incoming message to the chat state
        if(recieverId ===message.senderId){
            setChats((prevChats) => [...prevChats, { content: message.content, senderId: message.senderId }]);
        }
    };

    // Listen for the 'newMessage' event and call handleNewMessages when it is received
    socket.on('newMessage', handleNewMessages);

    // Emit 'join' with the userId to the backend
    socket.emit('join', userId);

    // Cleanup the listener when the component unmounts or `socket` changes
    return () => {
        socket.off('newMessage', handleNewMessages);
    };
}, [socket, userId]);


    return (
        <>
            <div className="flex flex-col justify-start items-start w-[65%] md:w-[75%] h-[99%] bg-white/0 border-white-900 rounded-xl ring-1 ring-white shadow-xl">
                <div className="w-full flex justify-center items-center h-[12%] bg-white/80 backdrop-blur-[1px] border-white-900 rounded-t-xl ring-1 ring-white/60 shadow-xl">
                    <img src={clickedUser.image || "../images/user.png"} className="w-10 h-10 ml-2 object-cover bg-gray-700 cursor-pointer ring-2 ring-gray-900 rounded-full"/>
                    <h1 className="w-[50%] pl-4 text-start font-bold text-xl">{clickedUser.firstname} {clickedUser.lastname}</h1>
                    <h1 className="w-[50%] text-end text-2xl pr-4" onClick={() => { setclicked(false) }}>X</h1>
                </div>
                <div className="w-full h-[86%] flex-col overflow-y-auto scrollbar-hide no-scrollbar">
                    {chats &&
                        chats.map((chat,index)=>{
                            return(<div key={index} className={`flex p-2 ${chat.senderId===userId ?"justify-end":"justify-start"}`}>
                                <div className={`p-2 rounded ${chat.senderId===userId ?"bg-blue-400":"bg-white"}`}>
                                    {chat.content}
                                    {/* {console.log(chat.senderId)} */}
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div className="w-full h-[12%] flex justify-center gap-4 items-center ring-1 ring-white/90 rounded-b-xl border-white/90 bg-white/80 backdrop-blur-[1px] rounded-b-xl">
                <form onSubmit={handleSend} className="w-full h-[12%] flex justify-center gap-4 items-center">
                    <input onChange={(e)=>{setMessage(e.target.value)}} value={message} type="text" placeholder="Enter your message here !!" className="w-[70%] ring-1 h-10 m-2 pl-2 rounded-xl " />
                    <button type="submit" className="w-8 h-8">
                        <img src="../../../images/paper_plane.png" className="h-8 w-8" />
                    </button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Chat;