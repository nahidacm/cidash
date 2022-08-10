import useSWR from 'swr'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export function useUser() {
  const { data, mutate } = useSWR('/api/users', fetcher)
  // if data is not defined, the query has not completed
  console.log('data useuser: ', data);
  
  const loading = !data
  const user = data?.user
  return [user, { mutate, loading }]
}