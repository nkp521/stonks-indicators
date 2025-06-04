// Create a news section
const newsContainer = document.getElementById('news-articles');

const displayNews = (articles) => {
  newsContainer.innerHTML = "";
  const topTenArticles = articles.slice(0, 10);
  topTenArticles.forEach(article => {
    const p = document.createElement("p");

    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.headline;
    link.target = "_blank";

    p.appendChild(link);
    newsContainer.appendChild(p);
  });
}

//Grab Ticker from Stock-Search
const searchInput = document.getElementById("stock-search");
searchInput.innerHTML = "";

const handleTickerChange = (event) => {
  if (event.key === "Enter") {
  const newTicker = event.target.value.toUpperCase();
  console.log(newTicker);
  fetchNews(newTicker);
  renderSymbolInfo(newTicker);
  }
};

searchInput.addEventListener("keydown", handleTickerChange);

//Create Fetch News Function to fetch when a new stock is enetered

const fetchNews = (ticker) => {
  console.log("Fetching news for:", ticker);
  const from = "2025-05-01"
  const to = "2025-06-03"
  const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}`;
   console.log("URL:", url);

  fetch (url) 
  .then(res => res.json())
  .then(data => displayNews(data))
  .catch(err => console.error(err));
};

const renderSymbolInfo = (ticker) => {
  const container = document.getElementById("symbol-info");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
  script.type = "text/javascript"
  script.async = true;

  script.innerHTML = JSON.stringify({
    symbol: `NASDAQ:${ticker}`,
    width: "100%",
    locale: "en",
    colorTheme: "light",
    isTransparent: false,
  });

  container.appendChild(script);
};

fetchNews("AAPL");
renderSymbolInfo("AAPL");
