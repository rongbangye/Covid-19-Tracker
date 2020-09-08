const prevNews = document.querySelector(".prev-news");
const nextNews = document.querySelector(".next-news");

// https://developer.smartable.ai/api-details#api=coronavirus&operation=stats
function getNews() {
  fetch("https://api.smartable.ai/coronavirus/news/US", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
      "Subscription-Key": "9d6534c138914eabb775e43b05f174cd"
    }
  })
    .then(response => response.json())
    .then(newsCovid => {
      const newsDetail = document.querySelector(".news-detail");

      let page = 0;
      let newsList = [];

      newsCovid.news.forEach(news => {
        let liveCountryEL = document.createElement("li");

        liveCountryEL.classList = "news-detail-li";
        // console.log(news);
        liveCountryEL.innerHTML += `
        <p class="news-title">${truncateString(news.title, 80)}</p>
        <div class="readMoreNews"><a href="${
          news.webUrl
        }" target="_blank">Read More <span>&#8594;</span> </a></div>
        `;

        // push news to the empty newsList array
        newsList.push(liveCountryEL);
      });

      // pre and next button logic
      for (let i = 0; i < page + 1; i++) {
        newsDetail.appendChild(newsList[i]);
      }

      nextNews.addEventListener("click", () => {
        page == newsList.length - 1 ? (page = 0) : (page += 1);
        newsDetail.innerHTML = "";
        for (let i = page; i < page + 1; i++) {
          newsDetail.appendChild(newsList[i]);
        }
      });

      prevNews.addEventListener("click", () => {
        page == 0 ? (page = newsList.length - 1) : (page -= 1);
        newsDetail.innerHTML = "";
        for (let i = page; i < page + 1; i++) {
          newsDetail.appendChild(newsList[i]);
        }
      });
    });
}

getNews();
