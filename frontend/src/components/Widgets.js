import "./Widgets.css";

export function ChatWidget({name, message, setName}) {
    return (
        <button className="chat-widget" onClick={() => setName(name)}>
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
        </button>
    )
}

export function RecentWidget({name, img, setName}) {
    return (
        <button className="recents-widget" onClick={() => setName(name)}>
            <img src={img} alt={name} />
            <h3>{name}</h3>
        </button>
    )
}

export function MessageWidget({sender, message, img, time}) {
    const temp = sender.toLowerCase() === 'you' ? 'sent' : 'recv';
    return (
        <div className={"message-widget-container " + temp}>
            <div className="message-widget">
                <img src={img} alt={sender} />
                <div className="message-info">
                    <h3>{sender}</h3>
                    <p>{message}</p>
                    <h5>{time}</h5>
                </div>
            </div>
        </div>
    )
}