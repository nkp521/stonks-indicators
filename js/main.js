import { renderSymbolInfo, renderAdvancedChart, renderCompanyProfile, renderFinancialData, renderTechnicalAnalysis, renderTopStories } from './widgets.js';
import { fetchNews } from './news.js';
import { addToWatchlist } from './watchlist.js';

let currentTicker = "AAPL";
let selectedInterval = "1";

const searchInput = document.getElementById("stock-search");
const timeframeSelect = document.getElementById("timeframe-selector");
const addToWatchlistBtn = document.getElementById("add-to-watchlist-btn");

searchInput.addEventListener("keypress", handleTickerChange);
timeframeSelect.addEventListener("change", handleTimeframeChange);
addToWatchlistBtn.addEventListener("click", () => addToWatchlist(currentTicker, loadStockDetails));

function handleTickerChange(event) {
  if (event.key === "Enter") {
    currentTicker = event.target.value.toUpperCase();
    loadStockDetails(currentTicker);
    searchInput.value = "";
  }
}

function handleTimeframeChange(event) {
  selectedInterval = event.target.value;
  renderAdvancedChart(currentTicker, selectedInterval);
  renderTechnicalAnalysis(currentTicker, getTechInterval(selectedInterval));
}

const getTechInterval = (interval) =>
  interval === "1" ? "1m" :
  interval === "5" ? "5m" :
  interval === "15" ? "15m" :
  interval === "60" ? "1h" :
  interval === "D" ? "1D" :
  interval === "W" ? "1W" :
  interval === "M" ? "1M" :
  "1m";

export function loadStockDetails(ticker) {
  currentTicker = ticker;
  
  renderSymbolInfo(ticker);
  renderAdvancedChart(ticker, selectedInterval);
  renderCompanyProfile(ticker);
  renderFinancialData(ticker);
  renderTechnicalAnalysis(ticker, getTechInterval(selectedInterval));
  fetchNews(ticker);
}

function initializeApp() {
  loadStockDetails(currentTicker);
  renderTopStories();
}

initializeApp(); 
