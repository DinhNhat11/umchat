export default function ChatWidget({name, message}) {
    return (
        <div className="chat-widget">
            <div className="profile-pic">
                <img src="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" alt="profile-pic" />
            </div>
            <div className="chat-info">
                <h3>{name}</h3>
                <p>{message}</p>
            </div>
            <div className="status">
                <p>10 Online</p>
            </div>
        </div>
    )
}