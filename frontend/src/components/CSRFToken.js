import { useEffect, useState } from "react";
import { handleFetch } from "../api/HandleFetch";
import { IPADDRESS } from "../Backend_Address";
import Cookies from 'js-cookie';

export const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('');

    const changeCsrfToken = (value) => {
        console.log(value)
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
        handleFetch(IPADDRESS + "accounts/get-csrf-token/", null, false);
        changeCsrfToken(getCookie('csrftoken'));
    }, []);

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}