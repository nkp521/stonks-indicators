# Stock Analysis App

## Feature 1: View Real-Time Chart

**User Story**  
As a user, I want to view a real-time TradingView stock chart with an RSI overlay so that I can analyze price momentum.

**Details**  
On page load, display a real-time TradingView chart for AAPL. Include the RSI indicator with a 14-period setting. The chart will be embedded using the TradingView Widget API.

## Feature 2: Change the Ticker Symbol

**User Story**  
As a user, I want to see the related news for the stock I am analyzing

**Details**  
Provide an news section where the top 10 articles from Finnhub API show the news articles related to the Stock the user searches for.

## Feature 3: Change the Ticker Symbol

**User Story**  
As a user, I want to type in a ticker symbol so that I can switch the stock I’m analyzing.

**Details**  
Provide an input box where the user can type a valid stock symbol. When submitted, the chart/news dynamically updates.

## Feature 4: Change Timeframes

**User Story**  
As a user, I want to switch between different time intervals (e.g., 1D, 1W, 1Min) so I can view various trends.

**Details**  
Add a dropdown menu to select the time interval. Changing the interval updates the chart with the selected timeframe.

## Feature 5: Quick Watchlist

**User Story**  
As a user, I want quick access to common tickers so I can load the charts/news easily for my watch-list.

**Details**  
Display a set of buttons for popular tickers (e.g., AAPL, TSLA, AMZN). Clicking a button immediately loads that ticker in the chart.
