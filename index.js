const apiKey = "d0vf12pr01qkepcvrurgd0vf12pr01qkepcvrus0";
const ticker = "AAPL";
const from = "2025-05-01";
const to = "2025-06-03";

fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}`)
  .then(res => res.json())
  .then(data => displayNews(data))
  .catch(err => console.error(err));

// Create a news section
const newsContainer = document.getElementById('news-articles');

const displayNews = (articles) => {
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
