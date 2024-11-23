import { useState } from "react";
import "./Chatarea.css";
import { MessageWidget } from "./Widgets";
import { testMessages } from "./testMessages";

export function ChatArea({name, profilePic, setName, mode}) {
    const [options, setOptions] = useState(false);

    const toggleOptions = () => {
        setOptions((prev) => !prev);
    }

    const optionsList = [
        {
            name: "Mute",
            action: () => console.log("Mute")
        },
        {
            name: "Delete",
            action: () => console.log("Delete")
        },
        {
            name: "Leave Chat",
            action: () => console.log("Leave")
        },
        {
            name: "Go Back",
            action: () => setName(null)
        }
    ]

    const messages = testMessages.map((message, index) => {
        let sender = message.sender;
        if (message.sender.toLowerCase() !== "you") {
            sender = mode === "chatroom" ? sender : name;
        }
        return (
            <MessageWidget 
                key={index}
                sender={sender}
                message={message.content}
                time={message.sentTime}
                img="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000"
            />
        )
    })

    return (
        <div className="chatarea">
            <div className="chatarea-header">
                <div className="profile-pic">
                    <img src="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" alt="profile-pic" />
                </div>
                <div className="chatroom-name">
                    <h2>{name}</h2>
                </div>
                <div  className="chatroom-options">
                    <button className="chatroom-options-button" onClick={() => toggleOptions()}>
                        <img 
                            src="https://img.icons8.com/?size=100&id=98963&format=png&color=FFFFFF" 
                            alt="options" 
                        />
                    </button>
                    {options && <ClassRoomOptionsButton optionsList={optionsList} />}
                </div>
            </div>
            <div className="chatarea-body">
                {messages}
            </div>
            <div className="chatarea-footer">

            </div>
        </div>
    );
}

function ClassRoomOptionsButton({optionsList}) {
    const OptionsButtons = optionsList.map((option, index) => {
        return (
            <li key={option.name}>
                <button 
                    className="chatroom-options-button"
                    onClick={option.action}
                >
                    {option.name}
                </button>
            </li>
        );
    });
    return (
        <ul className="chatroom-options-list">
            {OptionsButtons}
        </ul>
    );
}

export function EmptyChatArea() {
    return (
        <div className="chatarea empty">
        </div>
    )
}