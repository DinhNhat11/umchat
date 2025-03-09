import { useState, useEffect, createContext } from 'react';
import { IPADDRESS } from '../Backend_Address';
import {handleSubmitAxios } from '../api/HandleSubmission';
import Cookies from 'js-cookie';
import { handleFetch, handleFetchAxios } from '../api/HandleFetch';

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    const [response, setResponse] = useState()
    const [user, setUser] = useState({});
    const [showLogout, setShowLogout] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const apiUrl = IPADDRESS + "accounts/login/";

    const loginUser = (username, password, csrfmiddlewaretoken) => {

        const data = {
            "username": username,
            "password": password
        }

        handleSubmitAxios(apiUrl, {}, data, setResponse);
    }

    const addFriend = (public_id, setter) => {
        const url = IPADDRESS + "add-friend/"

        const data = {
            "receiver": public_id
        }

        handleSubmitAxios(url, {}, data, setter)
    }

    useEffect(() => {
        handleFetchAxios(apiUrl, setResponse);
    }, [])

    useEffect(() => {
        console.log(response);
        if (response && response.code == '200') {
            setUser(response.message)
            setIsLoggedIn(true);
        }
    }, [response])

    return <UserContext.Provider 
        value={{
            loginUser,
            user,
            showLogout,
            setShowLogout,
            isLoggedIn,
            addFriend
        }}
        >
            {children}
        </UserContext.Provider>;
};