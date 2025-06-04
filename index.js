let currentTicker = "AAPL";
let selectedInterval = "60"
const searchInput = document.getElementById("stock-search");

const fetchNews = (ticker) => {
  const from = "2025-05-01"
  const to = new Date().toJSON().slice(0, 10);
  const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}`;
   console.log("URL:", url);

  fetch (url) 
  .then(res => res.json())
  .then(data => displayNews(data))
  .catch(err => console.error(err));
};

const displayNews = (articles) => {
  const container  = document.getElementById('news-articles');
  container.innerHTML = "";

  const topTenArticles = articles.slice(0, 10);
  topTenArticles.forEach(article => {
    const p = document.createElement("p");

    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = article.headline;
    link.target = "_blank";

    p.appendChild(link);
    container.appendChild(p);
  });
};

const getTechInterval = (interval) =>
  interval === "1" ? "1m" :
  interval === "5" ? "5m" :
  interval === "15" ? "15m" :
  interval === "60" ? "1h" :
  interval === "D" ? "1D" :
  interval === "W" ? "1W" :
  interval === "M" ? "1M" :
  "1D";


const handleTickerChange = (event) => {
  if (event.key === "Enter") {
  currentTicker = event.target.value.toUpperCase();

  fetchNews(currentTicker);
  renderSymbolInfo(currentTicker);
  renderAdvancedChart(currentTicker, selectedInterval);
  renderTechnicalAnalysis(currentTicker, getTechInterval(selectedInterval));
  renderCompanyProfile(currentTicker);
  renderFinancialData(currentTicker);
  renderTopStories(currentTicker);

  searchInput.value = "";
  };
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

const renderAdvancedChart = (ticker, chartInterval) => {
  const container = document.getElementById("advanced-chart");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    autosize: true,
    hide_top_toolbar: true,
    symbol: `NASDAQ:${ticker}`,
    interval: chartInterval,
    timezone: "America/New_York",
    theme: "light",
    style: "1",
    locale: "en",
    allow_symbol_change: true,
  });

  container.appendChild(script);
};

const renderCompanyProfile = (ticker) => {
  const container = document.getElementById("company-profile");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    width: "400",
    height: "350",
    isTransparent: true,
    colorTheme: "light",
    symbol: `NASDAQ:${ticker}`,
    locale: "en",
  });

  container.appendChild(script);
};

const renderFinancialData = (ticker) => {
  const container = document.getElementById("financial-data");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    isTransparent: true,
    displayMode: "adaptive",
    width: 400,
    height: 550,
    colorTheme: "light",
    symbol: `NASDAQ:${ticker}`,
    locale: "en",
  });

  container.appendChild(script);
};

const renderTechnicalAnalysis = (ticker, techInterval) => {
  const container = document.getElementById("technical-analysis");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    interval: techInterval,
    width: "100%",
    height: "60%",
    symbol: `NASDAQ:${ticker}`,
    showIntervalTabs: false,
    displayMode: "single",
    locale: "en",
    colorTheme: "light"
  });

  container.appendChild(script);
};

const renderTopStories = () => {
  const container = document.getElementById("top-stories");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    feedMode: "all_symbols",
    width: "100%",
    height: "60%",
    colorTheme: "light",
    isTransparent: false,
    displayMode: "regular",
    locale: "en"
  });

  container.appendChild(script);
};

searchInput.addEventListener("keydown", handleTickerChange);
fetchNews(currentTicker);
renderSymbolInfo(currentTicker);
renderAdvancedChart(currentTicker, selectedInterval);
renderCompanyProfile(currentTicker);
renderFinancialData(currentTicker);
renderTechnicalAnalysis(currentTicker, getTechInterval(selectedInterval));
renderTopStories();

const timeframeSelect = document.getElementById("timeframe-selector");

const handleTimeframeChange = (event) => {
  selectedInterval = event.target.value;

  renderAdvancedChart(currentTicker, selectedInterval);
  renderTechnicalAnalysis(currentTicker, getTechInterval(selectedInterval));
};

timeframeSelect.addEventListener("change", handleTimeframeChange);
