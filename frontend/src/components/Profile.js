import "./Profile.css"
import { useContext, useState} from "react";
import { LocationContext } from "../contexts/locationContext";

export function GroupProfile ({groupProfile, setShowProfile}) {
    const { actions, prevLocation } = useContext(LocationContext)
    const isAdmin = false;

    const options = [
        {"name": "Add User", "action": () => console.log("Add User")},
        {"name": "Remove User", "action": () => console.log("Remove User")},
        {"name": "Join Group", "action": () => console.log("Joined Group")},
        {"name": "Message Group", "action": () => console.log("Messaged Group")},
        // {"name": "Change Profile", "action": () => console.log("Joined Group")},
        // {"name": "Rename Group", "action": () => console.log("Renamed Group")},
        
    ]

    const optionsButtons = options.map((option, index) => {
        return (
            <button key={index} onClick={option.action}>{option.name}</button>
        )
    })

    const admins = groupProfile.admins.map((admin, index) => {
        return (
            <li key={index}>{admin}</li>
        )
    })
    return (
            
        <div className="group-profile profile custom-scrollbar">
            <div className="user-profile-buttons">
                <button onClick={() => actions.exitProfile(prevLocation, false, setShowProfile)} className="exit-button">
                    <img src="https://img.icons8.com/?size=100&id=26194&format=png&color=FFFFFF" alt="back" />
                    <h3>Back</h3>
                </button>
                { isAdmin &&
                <button onClick={actions.editProfile} className="edit-button">
                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=FFFFFF" alt="back" />
                    <h3>Edit</h3>
                </button>
                }
            </div>
            <div className="group-profile-header">
                <img src={groupProfile.profilePic} alt="profile" />
                <h2>{groupProfile.name} <span>{groupProfile.members} members</span></h2>
                <h3>Creator - {groupProfile.createdBy}</h3>
                <h3>Admins</h3>
                <ul>{admins}</ul>
            </div>

            <div className="user-profile-options">
                {optionsButtons}
            </div>

            <div className="user-profile-body">
                <h2>Profile Description</h2>
                <p>{groupProfile.desc}</p>
            </div>
        </div>
    )
}

export function UserProfile ({profile, setShowProfile, myProfile}) {
    const { prevLocation, actions } = useContext(LocationContext);

    const options = [
        {"name": "Add User", "action": () => console.log("Add User")},
        {"name": "Remove User", "action": () => console.log("Remove User")},
        {"name": "Message User", "action": () => console.log("Message User")},
    ]

    const optionsButtons = options.map((option, index) => {
        return (
            <button key={index} onClick={option.action}>{option.name}</button>
        )
    })
    return (
        <div className="user-profile profile custom-scrollbar">
            <div className="user-profile-buttons">
                <button onClick={() => actions.exitProfile(prevLocation, myProfile, setShowProfile)} className="exit-button">
                    <img src="https://img.icons8.com/?size=100&id=26194&format=png&color=FFFFFF" alt="back" />
                    <h3>Back</h3>
                </button>
                {myProfile &&
                <button onClick={actions.editProfile} className="edit-button">
                    <img src="https://img.icons8.com/?size=100&id=86374&format=png&color=FFFFFF" alt="back" />
                    <h3>Edit</h3>
                </button>
                }
            </div>
            <div className="user-profile-header">
                <img src={profile.profilePic} alt="profile" />
                <h2>{profile.name} <span>({profile.pronouns})</span></h2>
                <h3>{profile.year}, {profile.Faculty}-{profile.Department}</h3>
                <h3>{profile.email}</h3>
            </div>

            <div className="user-profile-options">
                {optionsButtons}
            </div>

            <div className="user-profile-body">
                <h2>Profile Description</h2>
                <p>{profile.desc}</p>
            </div>
        </div>
    )
}

export function EditProfile({profile}) {
    const { prevLocation, actions } = useContext(LocationContext);
    const [formInputs, setFormInputs] = useState(profile)


    console.log(formInputs)

    const formElements = Object.entries(formInputs).map(([key, value], index) => {
        let inputElement, type, accept, textArea;
        const handleChange = (e) => {
            setFormInputs({...formInputs, [key]: e.target.value})
        }

        textArea = null;
        accept = "*"

        if (key === "profilePic") {
            type="file"
            accept="image/*"
            value=undefined
        } else if (key === "desc") {
            textArea = <textarea value={value} onChange={handleChange}/>
        }

        inputElement = textArea == null ? <input type={type} value={value} accept={accept}
                    onChange={handleChange}
                    /> : textArea

        return (
            <div key={key} className={key}>
                <label htmlFor={key}>{key}</label>
                {inputElement}
            </div>
        )
    })

    return (
        <div className="user-profile-edit profile custom-scrollbar">
            <div className="user-profile-buttons">
                <button onClick={() => actions.exitProfile(prevLocation)} className="save-button">
                    <img src="https://img.icons8.com/?size=100&id=26194&format=png&color=FFFFFF" alt="back" />
                    <h3>Back</h3>
                </button>
                <button onClick={actions.saveProfile} className="save-button">
                    <img src="https://img.icons8.com/?size=100&id=114054&format=png&color=FFFFFF" alt="back" />
                    <h3>Save</h3>
                </button>
            </div>
            <form className="profile-edit-form" onSubmit={(e)=>e.preventDefault()}>
                {formElements}
            </form>
        </div>
    )
}