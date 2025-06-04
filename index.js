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
  renderAdvancedChart(newTicker);
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

    //   <!-- TradingView Advanced Chart Widget BEGIN -->
    //   <div class="tradingview-widget-container">
    //     <div class="tradingview-widget-container__widget"></div>
    //     <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
    //     {
    //       "width": "980",
    //       "height": "100%",
    //       "symbol": "NASDAQ:AAPL",
    //       "interval": "60",
    //       "timezone": "America/New_York",
    //       "theme": "light",
    //       "style": "1",
    //       "locale": "en",
    //       "hide_top_toolbar": true,
    //       "allow_symbol_change": true,
    //       "studies": ["STD;RSI"],
    //       "support_host": "https://www.tradingview.com"
    //     }
    //     </script>
    //   </div>
    //   <!-- TradingView Advanced Chart Widget END -->
    // </section>

    const renderAdvancedChart = (ticker) => {
      const container = document.getElementById("advanced-chart");
      container.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;

      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `NASDAQ:${ticker}`,
        interval: "D",
        timezone: "America/New_York",
        theme: "light",
        style: "1",
        locale: "en",
        allow_symbol_change: true,
      });

      container.appendChild(script);
    };
  renderAdvancedChart("AAPL");
