
export async function FECHT(url : string)  {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            cache : "force-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } catch (error : unknown) {
        console.log(error)
    }
}
