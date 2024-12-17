import axios from "axios";
import Cookies from 'js-cookie';

export const handleSubmit = async (url, headers, data, setter) => {
    try {
        const response = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setter(response.json()); // Parse the JSON response
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export const handleSubmitAxios = (url, headers={}, data={}, setter) => {
    const default_headers = {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                'csrfmiddlewaretoken': Cookies.get('csrftoken'),
                'mode': 'same-origin'
    }

    const default_data = {   
        "csrfmiddlewaretoken": Cookies.get('csrftoken')
    }

    axios.post(url, {...default_data, ...data}, {headers: {...default_headers, ...headers}, withCredentials: true} )
      .then((response) => {
        // console.log(response);
        setter({"code": response.status, "message": response.data})

        return (response.status);
      })
      .catch((error) => {
        // console.log(error);
        setter({"code": error.status, "message": error.response.data})

        return (error.status);
      })
}