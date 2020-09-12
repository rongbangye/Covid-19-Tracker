const prevNews = document.querySelector(".prev-news");
const nextNews = document.querySelector(".next-news");

// https://developer.smartable.ai/api-details#api=coronavirus&operation=stats
function getNews() {
  fetch("https://cryptic-ravine-96718.herokuapp.com/")
    .then(response => response.json())
    .then(newsCovid => {
      const newsDetail = document.querySelector(".news-detail");

      let page = 0;
      let newsList = [];
      console.log(newsCovid);
      newsCovid.news.forEach(news => {
        let liveCountryEL = document.createElement("li");

        liveCountryEL.classList = "news-detail-li";
        // console.log(news);
        liveCountryEL.innerHTML += `
        <p class="news-title">${truncateString(news.title, 80)}</p>
        <div class="readMoreNews"><a href="${
          news.link
        }" target="_blank">Read More <span>&#8594;</span> </a></div>
        `;

        // push news to the empty newsList array
        newsList.push(liveCountryEL);
      });

      // pre and next button logic
      for (let i = 0; i < page + 1; i++) {
        document.querySelector(".spinner-news").style.display = "none";
        newsDetail.appendChild(newsList[i]);
      }

      nextNews.addEventListener("click", () => {
        console.log(page);
        // disable or enable next and previous button when reach on first or last page
        page == 0
          ? prevNews.classList.remove("disable")
          : page == 99
          ? nextNews.classList.add("disable")
          : nextNews.classList.remove("disable");

        page == newsList.length - 1 ? (page = 0) : (page += 1);
        newsDetail.innerHTML = "";
        for (let i = page; i < page + 1; i++) {
          newsDetail.appendChild(newsList[i]);
        }
      });

      prevNews.addEventListener("click", () => {
        // disable or enable next and previous button when reach on first or last page
        page == 1
          ? prevNews.classList.add("disable")
          : nextNews.classList.remove("disable");

        page == 0 ? (page = newsList.length - 1) : (page -= 1);
        newsDetail.innerHTML = "";
        for (let i = page; i < page + 1; i++) {
          newsDetail.appendChild(newsList[i]);
        }
      });
    });
}

getNews();
