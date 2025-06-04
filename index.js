const defaultTicker = "AAPL";
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

const handleTickerChange = (event) => {
  if (event.key === "Enter") {
  const newTicker = event.target.value.toUpperCase();
  console.log(newTicker);
  fetchNews(newTicker);
  renderSymbolInfo(newTicker);
  renderAdvancedChart(newTicker);
  renderCompanyProfile(newTicker);
  renderFinancialData(newTicker);
  renderTechnicalAnalysis(newTicker);
  renderTopStories(newTicker);

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
    interval: "60",
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

const renderTechnicalAnalysis = (ticker) => {
  const container = document.getElementById("technical-analysis");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    interval: "1h",
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

const renderTopStories = (ticker) => {
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
fetchNews(defaultTicker);
renderSymbolInfo(defaultTicker);
renderAdvancedChart(defaultTicker);
renderCompanyProfile(defaultTicker);
renderFinancialData(defaultTicker);
renderTechnicalAnalysis(defaultTicker);
renderTopStories(defaultTicker);

const timeframeSelect = document.getElementById("timeframe-selector");

const handleTimeframeChange = (event) => {
  const selectedValue = event.target.value;
  console.log(selectedValue);
}
timeframeSelect.addEventListener("change", handleTimeframeChange);

const mapToTradingviewInterval = (timeframe) => {
  const intervalMap = {
    "1": "1m",
    "5": "5m",
    "10": "10m",
    "60": "1h",
    "D": "1D",
    "W": "1W",
    "M": "1M",
    "Y": "12M"
  };

  return intervalMap[timeframe] || "1D";
};
