

export default function ChatroomHeader() {
    const chatrooms = ["Chatroom 1", "Chatroom 2", "Chatroom 3", "Chatroom 4"];

    const chatroomRecents = chatrooms.map((chatroom, index) => {
        return (
            <ChatroomRecentWidget 
                key={chatroom} 
                name={chatroom} 
                img="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" 
            />
        )
    })

    return (
        <div className="chatroom-header">
            <h1>Chatrooms</h1>
            <input type="text" placeholder="Search chatrooms" />
            <div className="chatroom-recents">
                {chatroomRecents}
            </div>
        </div>
    )
}

function ChatroomRecentWidget({name, img}) {
    return (
        <div className="recents-widget">
            <img src={img} alt={name} />
            <h3>{name}</h3>
        </div>
    )
}