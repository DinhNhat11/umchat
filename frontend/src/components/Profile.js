import { profile } from "./sampleProfile"
import "./Profile.css"

export function GroupProfile () {
    return (
        <div className="user-profile profile">
            <h1>Profile</h1>
        </div>
    )
}

export function UserProfile () {
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