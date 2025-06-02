# Stock Analysis App

## Feature 1: View Real-Time Chart

**User Story**  
As a user, I want to view a real-time TradingView stock chart with an RSI overlay so that I can analyze price momentum.

**Details**  
On page load, display a real-time TradingView chart for AAPL. Include the RSI indicator with a 14-period setting. The chart will be embedded using the TradingView Widget API.

## Feature 2: Change the Ticker Symbol

**User Story**  
As a user, I want to type in a ticker symbol so that I can switch the stock I’m analyzing.

**Details**  
Provide an input box where the user can type a valid stock symbol. When submitted, the chart dynamically updates without a page reload. This is implemented using a change event listener.

## Feature 3: Add a Second Chart

**User Story**  
As a user, I want to view a second chart beside the first so that I can compare two stocks.

**Details**  
Include a toggle button to show/hide a second chart container. When enabled, a second input box and chart will appear. Each chart updates independently using its own symbol input. This uses a click event listener.

## Feature 4: Change Timeframes

**User Story**  
As a user, I want to switch between different time intervals (e.g., 1D, 1W, 1Min) so I can view various trends.

**Details**  
Add a dropdown menu to select the time interval. Changing the interval updates the chart with the selected timeframe. This is implemented using a change event listener.

## Feature 5: Quick Watchlist

**User Story**  
As a user, I want quick access to common tickers so I can load their charts easily.

**Details**  
Display a set of buttons for popular tickers (e.g., AAPL, TSLA, AMZN). Clicking a button immediately loads that ticker in the chart. Rendered using array iteration and implemented with a click event listener.
