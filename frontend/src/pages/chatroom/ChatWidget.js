export default function ChatWidget({name, message}) {
    return (
        <div className="chat-widget">
            <div className="profile-pic">
                <img src="https://tse2.mm.bing.net/th?id=OIP.6vMLuqEajaJZFsdiye9NWQHaHi&pid=Api&P=0&h=180" alt="profile-pic" />
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