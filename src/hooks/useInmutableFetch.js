import useSWRImmutable from 'swr/immutable'

const useInmutableFetch = (...params) => {
  const response = useSWRImmutable(...params)

  return {
    ...response,
    loading: !response.error && !response.data && !!params[0],
  }
}

export default useInmutableFetch
