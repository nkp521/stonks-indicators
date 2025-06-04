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
}

//Create inline JS forTradingView WIdgets to dynimically update with ticker change

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js" async>
//   {
//   "symbol": "NASDAQ:AAPL",
//   "width": 550,
//   "locale": "en",
//   "colorTheme": "dark",
//   "isTransparent": false
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->

const renderSymbolInfo = (ticker) => {
  const container = document.getElementById("symbol-info");
  console.log(1);
  container.innerHTML = "";
 console.log(2);
  const script = document.createElement("script");
   console.log(3);
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
   console.log(4);
  script.type = "text/javascript"
   console.log(5);
  script.async = true;
 console.log(6);

  script.innerHTML = JSON.stringify({
    symbol: `NASDAQ:${ticker}`,
    width: "100%",
    locale: "en",
    colorTheme: "light",
    isTransparent: false,
  })
   console.log(7);
  container.appendChild(script);
  console.log(8);

};
