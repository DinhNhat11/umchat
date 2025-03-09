import { ChatWidget } from "../../components/Widgets";
import DirectMessageHeader from "./DirectMessageHeader";

export default function DirectMessagexMain({setName}) {
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

    const dms = [];

    for (let i = 0; i < 20; i++) {
        dms.push(
            <ChatWidget 
                key={i} 
                name={`Direct ${i}`} 
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
        <div className="direct-message-main">
            <DirectMessageHeader 
                setName={setName}
            />

            <div className="direct-message-list-container custom-scrollbar">
                {dms}
            </div>
        </div>
    )
}