import { getSearchData, getTopRatedMoviesList } from "./getData.js";
import { addPaginationEventListeners, updatePagination } from "./pagination.js";

let START_PAGE = 1;

const makeDataToCards = async () => {
  const root = document.querySelector("#root");
  const cardContainer = document.createElement("div");
  const cardList = document.createElement("ul");
  cardList.id = "card-list";
  cardContainer.id = "card-container";
  cardContainer.appendChild(cardList);
  root.appendChild(cardContainer);

  const data = await getTopRatedMoviesList(START_PAGE);
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

  updatePagination(totalPage, START_PAGE);
  addPaginationEventListeners(totalPage, START_PAGE);
  setActivePage(START_PAGE);
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

const handleCardAlert = (id) => {
  alert(`영화 id: ${id}`);
};
export const handleNextClick = (totalpage) => {
  if (START_PAGE + 10 <= totalpage) {
    START_PAGE += 10;
    updatePagination(totalpage, START_PAGE);
    addPaginationEventListeners(totalpage);
    setActivePage(START_PAGE);
    drawCards(START_PAGE);
  }
};

export const handlePrevClick = (totalpage) => {
  if (START_PAGE > 1) {
    START_PAGE -= 10;
    updatePagination(totalpage, START_PAGE);
    addPaginationEventListeners(totalpage);
    setActivePage(START_PAGE + 9);
    drawCards(START_PAGE + 9);
  }
};

export const handlePageNumberClick = async (event) => {
  if (event.target.classList.contains("page-number")) {
    document.querySelector(".page-number.active")?.classList.remove("active");
    event.target.classList.add("active");
    drawCards(Number(event.target.innerHTML));
  }
};

export const drawCards = async (pageNumber) => {
  const searchInput = document.querySelector("#search-input").value;
  const cardList = document.querySelector("#card-list");
  const data = searchInput
    ? await getSearchData(searchInput, pageNumber)
    : await getTopRatedMoviesList(pageNumber);
  const html = makeCards(data);
  cardList.innerHTML = html;
};
export const makeCards = (data) => {
  const cardData = data.results;
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
