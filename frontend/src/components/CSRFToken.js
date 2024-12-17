import { useEffect, useState } from "react";
import { handleFetch, handleFetchAxios } from "../api/HandleFetch";
import { IPADDRESS } from "../Backend_Address";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';

export const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const changeCsrfToken = (value) => {
        value && setcsrftoken(value);
    }

    const getCookie = (name) =>  {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        handleFetchAxios(IPADDRESS + "accounts/get-csrf-token/", setResponse, false);
        changeCsrfToken(getCookie('csrftoken'));
    }, []);

    useEffect(() => {
        if (response && response.code == 504) {
            navigate('/server-down');
        }
    }, [response])

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}