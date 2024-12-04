import { RecentWidget } from "../../components/Widgets";

export default function DirectMessageHeader({setName}) {
    const direct = ["DM 1", "DM 2", "DM 3", "DM 4"];

    const directRecents = direct.map((element, index) => {
        return (
            <RecentWidget 
                key={element} 
                name={element}
                setName={setName}
                img="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" 
            />
        )
    })

    return (
        <div className="direct-message-header">
            <h1>Direct Message</h1>
            <input type="text" placeholder="Search conversation" />
            <div className="direct-message-recents">
                {directRecents}
            </div>
        </div>
    )
}