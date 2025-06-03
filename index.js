require('dotenv').config();

const apiKey = process.env.API_KEY;
const symbol = "AAPL";
const from = "2025-05-01";
const to = "2025-06-03";

fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${apiKey}`)
  .then(res => res.json())
  .then(data => console.log(data))
