import { emptyGroupProfile } from "../../components/sampleProfile"
import { useState, useContext } from "react"
import { LocationContext } from "../../contexts/locationContext";

export default function CreateChatroom () {
    const {admins, createdBy, members, ...rest} = emptyGroupProfile
    const { prevLocation, actions } = useContext(LocationContext);
    const [formInputs, setFormInputs] = useState(rest)

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
        <div className="create-chatroom profile custom-scrollbar">
            <div className="user-profile-buttons">
                <button onClick={() => actions.exitProfile(prevLocation)} className="save-button">
                    <img src="https://img.icons8.com/?size=100&id=26194&format=png&color=FFFFFF" alt="back" />
                    <h3>Back</h3>
                </button>
                <button onClick={actions.saveProfile} className="save-button">
                    <img src="https://img.icons8.com/?size=100&id=OVI3sczm5NTI&format=png&color=ffffff" alt="back" />
                    <h3>Create</h3>
                </button>
            </div>
            <form className="profile-edit-form" onSubmit={(e)=>e.preventDefault()}>
                {formElements}
            </form>
        </div>
    )
}