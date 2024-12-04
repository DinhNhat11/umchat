import { useState, useEffect, createContext } from 'react';
import { IPADDRESS } from '../Backend_Address';
import { handleSubmit } from '../api/HandleSubmission';
import Cookies from 'js-cookie';

export const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const apiUrl = IPADDRESS + "accounts/login/";

    const loginUser = (username, password, csrfmiddlewaretoken) => {
        const headers = {
            'Content-Type': 'application/json',
            'x_CSRFToken': Cookies.get('csrftoken')
        }

        console.log(headers)
        const data = {
            "username": username,
            "password": password,
            "csrfmiddlewaretoken": csrfmiddlewaretoken
        }
        handleSubmit(apiUrl, headers, data, setUser);
    }

    useEffect(() => {
        console.log(user);
    }, [user])

    return <UserContext.Provider 
        value={{
            loginUser,
            user
        }}
        >
            {children}
        </UserContext.Provider>;
};