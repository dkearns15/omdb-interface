export function useFetch(url) {
  let data = null
  let error = null

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data = json))
    .catch((err) => (error = err))

  return { data, error }
}
