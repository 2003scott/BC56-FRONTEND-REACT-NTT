import { FETCH } from "@/lib/fetch-custom"
import { useEffect, useState } from "react"

export const useFetch = <T,>(url: string) => {

    const [ data, setData ] = useState<T | null>()
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ error, setError ] = useState<unknown>()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await FETCH.get(url)
                setData(data)
                setIsLoading(false)
            } catch (error : unknown) {
                setIsLoading(false)
                setError(error)
            }
        }
        fetchData()
    }, [])

    return { data, isLoading, error }

}
