import { useEffect, useState } from "react"

interface ApiResponse<T> {
  data: T | null;
  error: boolean;
  loading: boolean;
}

export const useFetch = <T>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    const fetchData = async () => {
      try {
        fetch(url)
          .then((res) => res.json())
          .then((data) => setData(data))
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}