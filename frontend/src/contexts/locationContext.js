import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const LocationContext = createContext(undefined);

export const LocationProvider = ({ children }) => {
    const [prevLocation, setPrevLocation] = useState('/');
    const [profileMode, setProfileMode] = useState("view");
    const navigate = useNavigate()

    const exitProfile = (prevLocation, myProfile=true, setShowProfile=null) => {
        if (!myProfile) {
            setShowProfile(false)
        } else {
            setProfileMode("view")
            navigate(prevLocation)
        }
    }

    const editProfile = () => {
        setProfileMode("edit");
    }

    const saveProfile = () => {
        setProfileMode("view");
    }

    const actions = {
        editProfile: editProfile,
        exitProfile: exitProfile,
        saveProfile: saveProfile
    }

    const changeLocation = (location) => {
        setPrevLocation(location);
    }

    // useEffect(() => {
    //     console.log(prevLocation);
    // }, [prevLocation]);

    return <LocationContext.Provider 
        value={{
            prevLocation,
            setPrevLocation: changeLocation,
            actions,
            profileMode: () => profileMode
        }}
        >
            {children}
        </LocationContext.Provider>;
};