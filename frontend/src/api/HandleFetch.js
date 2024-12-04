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