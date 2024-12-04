import { ChatWidget } from "../../components/Widgets";
import ChatroomHeader from "./ChatroomHeader";
import { useContext, useState } from "react";
import { ChatroomContext } from "../../contexts/ChatroomContext";

export default function ChatroomMain({setName}) {
    const { chatrooms, fetchChatrooms } = useContext(ChatroomContext);
    const [searchName, setSearchName] = useState("");

    if (chatrooms.length === 0) {
        fetchChatrooms();
    }

    const chatroomList = chatrooms.filter((chatroom) => {
        return chatroom.name.toLowerCase().includes(searchName.toLowerCase());
    })
    .map((chatroom, index) => {
        return (
            <ChatWidget key={index} name={chatroom.name} message={"Previous Message"} setName={setName} />
        )
    });


    return (
        <div className="chatroom-main">
            <ChatroomHeader 
                setName={setName}
                searchName={searchName}
                setSearchName={setSearchName}
            />

            <div className="chatroom-list-container custom-scrollbar">
                    {
                        chatroomList.length === 0 ?
                        <div className="empty-message">No chatrooms found</div>
                        :
                        chatroomList
                    }
            </div>
        </div>
    )
}