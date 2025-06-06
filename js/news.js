import { fetchApiKey } from './apiKey.js';

export const fetchNews = (ticker) => {
  fetchApiKey()
  .then(apiKey => {
    const from = "2025-05-01";
    const to = new Date().toJSON().slice(0, 10);
    const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => displayNews(data))
      .catch(err => console.error(err));
  }).catch(err => console.error(err));
};

const displayNews = (articles) => {
  const container = document.getElementById('news-articles');
  container.innerHTML = "";

  if (!Array.isArray(articles)) return;

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
