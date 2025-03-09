import axios from "axios";

export const handleFetch = async(url, setter, is_obj) => {
    try {
        const response = await fetch(url, {
            credentials: 'include',
            method: "GET",
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data)
        if (setter) {
            setter(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
}

export const handleFetchAxios = (url, setter, is_obj) => {
  axios.get(url, {withCredentials: true})
  .then(function (response) {
    setter({"code": response.status, "message": response.data});
  })
  .catch(function (error) {
    if (error.code == 'ERR_NETWORK') {
      setter({"code": 504, "message": "server offline"})
    } else {
      setter({"code": error.status, "message": error.response.data});
    }
  })
}