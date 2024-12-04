import { EditProfile, UserProfile } from '../../components/Profile';
import { useContext } from 'react';
import { profile } from "../../components/sampleProfile"
import { LocationContext } from '../../contexts/locationContext';

export default function ProfilePage() {  
    const { profileMode } = useContext(LocationContext)
    return (
        profileMode() === "view" ?
        <UserProfile
            myProfile={true} 
            profile={profile}
            setShowProfile={null}
        />
        :
        <EditProfile
            profile={profile}
        />
    )
}