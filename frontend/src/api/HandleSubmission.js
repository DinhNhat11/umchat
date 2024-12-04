
export const handleSubmit = async (url, headers, data, setter) => {
    console.log(headers)
    try {
        const response = await fetch(url, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(data)
        });
        console.log(response)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setter(response.json()); // Parse the JSON response
    } catch (error) {
        console.error("Error:", error.message);
    }
}