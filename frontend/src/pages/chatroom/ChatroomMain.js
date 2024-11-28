import { ChatWidget } from "../../components/Widgets";
import ChatroomHeader from "./ChatroomHeader";

export default function ChatroomMain({setName}) {
    // const chatrooms = [
    //     {"name": "Chatroom 1", "message": "Previous message"},
    //     {"name": "Chatroom 2", "message": "Previous message"},
    //     {"name": "Chatroom 3", "message": "Previous message"},
    //     {"name": "Chatroom 4", "message": "Previous message"},
    //     {"name": "Chatroom 5", "message": "Previous message"},
    //     {"name": "Chatroom 6", "message": "Previous message"},
    //     {"name": "Chatroom 7", "message": "Previous message"},
    //     {"name": "Chatroom 8", "message": "Previous message"},
    //     {"name": "Chatroom 9", "message": "Previous message"},
    //     {"name": "Chatroom 10", "message": "Previous message"},
    //     {"name": "Chatroom 11", "message": "Previous message"},
    //     {"name": "Chatroom 12", "message": "Previous message"},
    //     {"name": "Chatroom 13", "message": "Previous message"},
    //     {"name": "Chatroom 14", "message": "Previous message"},
    //     {"name": "Chatroom 15", "message": "Previous message"},
    //     {"name": "Chatroom 6", "message": "Previous message"},
    //     {"name": "Chatroom 6", "message": "Previous message"},
    //     {"name": "Chatroom 6", "message": "Previous message"},
    //     {"name": "Chatroom 6", "message": "Previous message"},
    // ];

    const chatroomList = [];

    for (let i = 0; i < 20; i++) {
        chatroomList.push(
            <ChatWidget 
                key={i} 
                name={`Chatroom ${i}`} 
                setName={setName}
                message={"previous message"} />
        );
    }

    // const chatroomList = chatrooms.map((chatroom, index) => {
    //     return (
    //         <ChatWidget key={index} name={chatroom.name} message={chatroom.message} />
    //     )
    // });


    return (
        <div className="chatroom-main">
            <ChatroomHeader 
                setName={setName}
            />

            <div className="chatroom-list-container custom-scrollbar">
                    {chatroomList}
            </div>
        </div>
    )
}