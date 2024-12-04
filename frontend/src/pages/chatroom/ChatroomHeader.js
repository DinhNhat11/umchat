import { RecentWidget } from "../../components/Widgets";
import { useContext } from "react";
import { ChatroomContext } from "../../contexts/ChatroomContext";

export default function ChatroomHeader({setName, searchName, setSearchName}) {
    const { chatrooms } = useContext(ChatroomContext);

    const chatroomRecents = chatrooms.slice(4).map((chatroom) => {
        return (
            <RecentWidget 
                key={chatroom.name} 
                name={chatroom.name}
                setName={setName}
                img="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" 
            />
        )
    })

    return (
        <div className="chatroom-header">
            <h1>Chatrooms</h1>
            <input type="text" placeholder="Search chatrooms" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
            <div className="chatroom-recents">
                {chatroomRecents}
            </div>
        </div>
    )
}