export const fetchAutocompleteSuggestions = async () => {
  const response = await fetch('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete')
  const data = await response.json()
  return data
}