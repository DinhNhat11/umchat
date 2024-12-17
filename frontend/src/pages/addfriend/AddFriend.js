import { useContext, useEffect, useState } from "react"
import "./addfriends.css"
import { handleFetchAxios } from "../../api/HandleFetch";
import { handleSubmitAxios } from "../../api/HandleSubmission";
import { IPADDRESS } from "../../Backend_Address";
import { UserContext } from "../../contexts/UserContext";

export default function AddFriend() {
    const [ data, setData ] = useState({
        link: "",
        id: "",
        username: ""
    });
    const [ response, setRepsonse ] = useState('')
    const [ showConfirm, setShowConfirm ] = useState(false)
    const { addFriend } = useContext(UserContext)

    const addButton = (onClick) => {
        const button = <button className="submit-button" onClick={onClick}>
                    <img src="https://img.icons8.com/?size=100&id=33662&format=png&color=ffffff" alt="add-img" />
                </button>

        return button
    }

    const updateData = (key, value) => {
        setData((prev) => {
            return (
                {...prev, [key]: value})
        })
    }

    const handleClick = (id) => {
        handleFetchAxios(IPADDRESS + "users/" + id, setRepsonse);
    }

    useEffect(() => {
        if (response.code == 200) {
            updateData("username", response.message.username)
            setShowConfirm(true)
        }
    }, [response])

    console.log(data)

    const className = showConfirm ? "disabled" : ""

    return (
        <>
            <div className={"add-friend " + className}>
                <h1>Add friends either by invite link or By user id</h1>
                <div className="invite-options">
                    <div className="Profile Link">
                        <h2>Enter Profile Link below</h2>
                        <div className="add-field">
                            <input type="text" name="profile-link" value={data.link}
                                onChange={(e) => updateData("link", e.target.value)}
                            ></input>
                            {addButton(()=> {})}
                        </div>
                    </div>
                    <div className="friend-id">
                        <h2>Enter Friend id below</h2>
                        <div className="add-field">
                            <input type="text" name="id" value={data.id}
                                onChange={(e) => updateData("id", e.target.value)}
                            ></input>
                            {addButton(()=> {
                                handleClick(data.id)
                                })}
                        </div>
                    </div>
                </div>

            </div>
            {showConfirm &&
            <div className="confirm-add-friend">
                <h2>Add {data.username} as Friend</h2>
                <div className="options">
                    <button className="option-button" onClick={() => {addFriend(data.id, (e) => {})}
                    }>Yes</button>
                    <button className="option-button deny-button"
                        onClick={() => {setShowConfirm(false)}}
                    >No</button>
                </div>
            </div>
            } 
        </>
    )
}