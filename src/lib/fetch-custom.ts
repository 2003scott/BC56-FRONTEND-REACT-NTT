
export const FETCH = { async request(method: string, url: string, data = null as unknown) {
        try {
            const options: RequestInit = {
                method,
                cache: 'force-cache',
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if (data) {
                options.body = JSON.stringify(data)
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options)
            return response.json()
        } catch (error: unknown) {
            console.log(error)

        }
    },

    async get(url: string) {
        return this.request('GET', url)
    },

    async post(url: string, data: unknown) {
        return this.request('POST', url, data)
    },

    async put(url: string, data: unknown) {
        return this.request('PUT', url, data)
    },

    async pacht(url: string, data: unknown) {
        return this.request('PUT', url, data)
    },

    async delete(url: string) {
        return this.request('DELETE', url)
    }
}
