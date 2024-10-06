
export async function FECHT(url) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            cache : "force-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    } catch (error) {
        console.log(error)
    }
}
