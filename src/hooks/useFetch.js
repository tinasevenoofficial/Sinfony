import useSWR from 'swr'

const useFetch = (...params) => {
  const response = useSWR(...params)

  return {
    ...response,
    loading: !response.error && !response.data && !!params[0],
  }
}

export default useFetch
