import { fetchApiKey } from './apiKey.js';

let currentTicker = "AAPL";
let selectedInterval = "1";
const searchInput = document.getElementById("stock-search");
const timeframeSelect = document.getElementById("timeframe-selector");
const addToWatchlistBtn = document.getElementById("add-to-watchlist-btn");
const watchlistSection = document.getElementById("watchlist");
const watchlist = [];

fetchApiKey().then(apiKey => {
  fetchNews("AAPL", apiKey);
});

const fetchNews = (ticker, apiKey) => {
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

  const topArticles = articles.slice(0, 25);
  topArticles.forEach(article => {
    const p = document.createElement("p");
    p.className = "p-2 hover:bg-gray-100 rounded";

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

  loadStockDetails(currentTicker);

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
    isTransparent: true,
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
    autosize: false,
    symbol: `NASDAQ:${ticker}`,
    interval: chartInterval,
    timezone: "America/New_York",
    theme: "light",
    style: "1",
    locale: "en",
    allow_symbol_change: false,
    width: "100%",
    height: "500",
    container_id: "advanced-chart",
    isTransparent: true,
    hide_side_toolbar: false,
    studies: [],
    container_id: "advanced-chart",
    hide_top_toolbar: true,
    border: false,
    backgroundColor: "rgba(255, 255, 255, 0)"
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
    width: "100%",
    height: "100%",
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
    displayMode: "regular",
    width: "100%",
    height: "100%",
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
    height: "100%",
    isTransparent: true,
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
    isTransparent: true,
    displayMode: "regular",
    width: "100%",
    height: "100%",
    colorTheme: "light",
    locale: "en"
  });

  container.appendChild(script);
};

const handleTimeframeChange = (event) => {
  selectedInterval = event.target.value;

  renderAdvancedChart(currentTicker, selectedInterval);
  renderTechnicalAnalysis(currentTicker, getTechInterval(selectedInterval));
};

const addToWatchlist = (ticker) => {
  if (ticker && !watchlist.includes(ticker)) {
    watchlist.push(ticker);
    console.log(ticker);
    renderWatchlistItem(ticker);
  };
};

const renderWatchlistItem = (ticker) => {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-2 mb-2";
  
  const tickerBtn = document.createElement("button");
  tickerBtn.textContent = ticker;
  tickerBtn.className = "text-blue-600 font-semibold hover:text-blue-800 flex-grow text-left px-2";

  tickerBtn.addEventListener("click", () => {
    currentTicker = ticker;
    loadStockDetails(ticker);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.className = "text-gray-400 hover:text-red-500 font-medium w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200";
  
  removeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    li.remove();
    
    const index = watchlist.indexOf(ticker);
    if (index !== -1) {
      watchlist.splice(index, 1);
    };
  });
  
  li.append(tickerBtn, removeBtn);
  watchlistSection.appendChild(li);
}

const loadStockDetails = (ticker) => {
  fetchNews(ticker);
  renderSymbolInfo(ticker);
  renderAdvancedChart(ticker, selectedInterval);
  renderCompanyProfile(ticker);
  renderFinancialData(ticker);
  renderTechnicalAnalysis(ticker, getTechInterval(selectedInterval));
  renderTopStories();
};

searchInput.addEventListener("keydown", handleTickerChange);
timeframeSelect.addEventListener("change", handleTimeframeChange);
addToWatchlistBtn.addEventListener("click", () => addToWatchlist(currentTicker));
loadStockDetails(currentTicker);
