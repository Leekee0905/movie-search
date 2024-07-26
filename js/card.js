import { getTopRatedMoviesList } from "./getData.js";
import pagination from "./pagination.js";

const makeDataToCards = async () => {
  const root = document.querySelector("#root");
  const cardContainer = document.createElement("div");
  const cardList = document.createElement("ul");
  cardList.id = "card-list";
  cardContainer.id = "card-container";
  cardContainer.appendChild(cardList);
  root.appendChild(cardContainer);
  let start_page = 1;

  const data = await getTopRatedMoviesList(start_page);
  const totalPage = data.total_pages;
  const html = makeCards(data);
  cardList.innerHTML = html;

  cardContainer.addEventListener("click", (event) => {
    const cardBox = event.target.closest(".card-box");
    if (cardBox) {
      const id = cardBox.getAttribute("key");
      handleCardAlert(id);
    }
  });

  const drawCards = async (pageNumber) => {
    const data = await getTopRatedMoviesList(pageNumber);
    const html = makeCards(data);
    cardList.innerHTML = html;
  };

  const updatePagination = (totalpage, start_page) => {
    let box = document.querySelector("#pagination-container");
    if (!box) {
      box = document.createElement("ul");
      box.id = "pagination-container";
      cardContainer.appendChild(box);
    }
    box.innerHTML = pagination(totalpage, start_page);
  };

  const handleNextClick = (totalpage) => {
    if (start_page + 10 <= totalpage) {
      start_page += 10;
      updatePagination(totalpage, start_page);
      addPaginationEventListeners(totalpage);
      setActivePage(start_page);
      drawCards(start_page);
    }
  };

  const handlePrevClick = (totalpage) => {
    if (start_page > 1) {
      start_page -= 10;
      updatePagination(totalpage, start_page);
      addPaginationEventListeners(totalpage);
      setActivePage(start_page + 9);
      drawCards(start_page + 9);
    }
  };

  const handlePageNumberClick = async (event) => {
    if (event.target.classList.contains("page-number")) {
      document.querySelector(".page-number.active")?.classList.remove("active");
      event.target.classList.add("active");
      drawCards(Number(event.target.innerHTML));
    }
  };

  const addPaginationEventListeners = (totalpage) => {
    const nextBtn = document.querySelector("#next");
    const prevBtn = document.querySelector("#prev");
    const pageNumbers = document.querySelectorAll(".page-number");

    nextBtn.addEventListener("click", () => handleNextClick(totalpage));

    prevBtn.addEventListener("click", () => handlePrevClick(totalpage));

    pageNumbers.forEach((pageNumber) => {
      pageNumber.addEventListener("click", handlePageNumberClick);
    });
  };

  const setActivePage = (page) => {
    const pageNumbers = document.querySelectorAll(".page-number");
    pageNumbers.forEach((pageNumber) => {
      if (Number(pageNumber.innerHTML) === page) {
        pageNumber.classList.add("active");
      } else {
        pageNumber.classList.remove("active");
      }
    });
  };

  updatePagination(totalPage, start_page);
  addPaginationEventListeners(totalPage);
  setActivePage(start_page);
};

const handleCardAlert = (id) => {
  alert(`영화 id: ${id}`);
};

export const makeCards = (data, keyword) => {
  const cardData = keyword
    ? data.results.filter((e) => e.title.includes(keyword))
    : data.results;

  const html = cardData
    .map((element) => {
      if (!element.overview) {
        element.overview = "소개글이 없습니다.";
      }
      return `
          <li class="card-list-contents">
            <div class="card-box" key=${element.id}>
              <div class="card-image">
                  <img src="https://image.tmdb.org/t/p/w200${element.poster_path}" alt="${element.title}"/>
              </div>
              <h3 class="card-title">
                ${element.title}
              </h3>
              <div class="card-content">
                ${element.overview}
              </div>
              <div class="card-vote">
                평점: ${element.vote_average}
              </div>
            </div>
          </li>
        `;
    })
    .join("");
  return html;
};

export default makeDataToCards;
