import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./Chatarea.css";
import { MessageWidget } from "./Widgets";
import { testMessages } from "./testMessages";

const MINHEIGHT = 100;
const MAXHEIGHT = 200;

export function ChatArea({name, profilePic, setName, mode, profile, setShowProfile}) {

    const [options, setOptions] = useState(false);
    const [showProfilePic, setShowProfilePic] = useState(false);
    const [value, setValue] = useState("");

    const textareaRef = useRef(null);
    const textAreaParentRef = useRef(null);

    useEffect(() => {
        setOptions(false);
    }, [name])

    const onChange = (event) => {
        setValue(event.target.value)
    };

    // Adjust the height of the textarea
    useLayoutEffect(() => {
        let temp, temp2;

        textareaRef.current.style.height = textAreaParentRef.current.clientHeight + "px";
        console.log(textareaRef.current.style.height, textAreaParentRef.current.clientHeight)

        temp2 = textareaRef.current.style.minHeight;
        temp = Math.max(
            (textareaRef.current.scrollHeight / textAreaParentRef.current.clientHeight) * 100,
            temp2.endsWith("%") ? temp2.slice(0, -1) : temp2,
        );
        
        temp2 = textareaRef.current.style.maxHeight;
        textareaRef.current.style.height = `${Math.min(
            temp,
            temp2.endsWith("%") ? temp2.slice(0, -1) : temp2,
        )}%`;
    }, [value]);

    const toggleOptions = () => {
        setOptions((prev) => !prev);
    }

    useEffect(() => {
        setShowProfilePic(false);
    }, [name]);

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
                    <button onClick={() => setShowProfilePic(true)}>
                        <img src="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" alt="profile-pic" />
                    </button>
                </div>
                <div className="chatroom-name">
                    <button onClick={() => setShowProfile(true)}>
                        <h2>{name}</h2>
                    </button>
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
            <div className="chatarea-body" onClick={() => setShowProfilePic(false)}>
                {showProfilePic &&
                    <div className="profile-pic-body">
                        <h3>{name}</h3>
                        <img src="https://img.icons8.com/?size=100&id=7Ffvtg1xmgaV&format=png&color=000000" alt="" />
                    </div>
                }
                {messages}
            </div>
            <div className="chatarea-footer" ref={textAreaParentRef}>
                <textarea
                    placeholder="Type a message..."
                    onChange={onChange}
                    ref={textareaRef}
                    value={value}
                    style={
                        {
                            minHeight: MINHEIGHT + "%",
                            maxHeight: MAXHEIGHT + "%"
                        }
                    }
                />
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