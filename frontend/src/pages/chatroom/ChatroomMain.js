import ChatWidget from "./ChatWidget";
import ChatroomHeader from "./ChatroomHeader";

export default function ChatroomMain() {
    const chatrooms = [
        {"name": "Chatroom 1", "message": "Previous message"},
        {"name": "Chatroom 2", "message": "Previous message"},
        {"name": "Chatroom 3", "message": "Previous message"},
        {"name": "Chatroom 4", "message": "Previous message"},
        {"name": "Chatroom 5", "message": "Previous message"},
        {"name": "Chatroom 6", "message": "Previous message"},
    ];

    const chatroomList = chatrooms.map((chatroom, index) => {
        return (
            <ChatWidget key={index} name={chatroom.name} message={chatroom.message} />
        )
    });
    return (
        <div className="chatroom-main">
            <ChatroomHeader />

            <div className="chatroom-list-container">
                    {chatroomList}
            </div>
        </div>
    )
}