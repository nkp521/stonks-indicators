let watchlist = [];

export const addToWatchlist = (ticker, onTickerSelect) => {
  if (ticker && !watchlist.includes(ticker)) {
    watchlist.push(ticker);
    renderWatchlistItem(ticker, onTickerSelect);
  }
};

const renderWatchlistItem = (ticker, onTickerSelect) => {
  const watchlistSection = document.getElementById("watchlist");
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-lg p-2 mb-2";
  
  const tickerBtn = document.createElement("button");
  tickerBtn.textContent = ticker;
  tickerBtn.className = "text-blue-600 font-semibold hover:text-blue-800 flex-grow text-left px-2";

  tickerBtn.addEventListener("click", () => {
    onTickerSelect(ticker);
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
    }
  });
  
  li.append(tickerBtn, removeBtn);
  watchlistSection.appendChild(li);
}; 
