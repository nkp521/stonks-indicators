export const renderSymbolInfo = (ticker) => {
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

export const renderAdvancedChart = (ticker, chartInterval) => {
  const container = document.getElementById("advanced-chart");
  container.innerHTML = "";

  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
  script.type = "text/javascript";
  script.async = true;

  script.innerHTML = JSON.stringify({
    autosize: true,
    symbol: `NASDAQ:${ticker}`,
    interval: chartInterval,
    timezone: "America/New_York",
    theme: "light",
    style: "1",
    locale: "en",
    allow_symbol_change: false,
    container_id: "advanced-chart",
    isTransparent: true,
    hide_side_toolbar: false,
    studies: ["STD;RSI"],
    hide_top_toolbar: true,
    border: false,
    backgroundColor: "rgba(255, 255, 255, 0)"
  });

  container.appendChild(script);
};

export const renderCompanyProfile = (ticker) => {
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

export const renderFinancialData = (ticker) => {
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

export const renderTechnicalAnalysis = (ticker, techInterval) => {
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

export const renderTopStories = () => {
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
