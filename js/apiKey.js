export function fetchApiKey() {
  return fetch("https://stonks-backend-usmw.onrender.com/key")
    .then(res => res.json())
    .then(data => data.apiKey)
    .catch(err => console.error(err));
}
