import getTopRatedMoviesList from "./getData.js";
import pagination from "./pagination.js";

const makeDataToCards = async () => {
  const root = document.querySelector("#root");
  const cardContainer = document.createElement("div");
  const cardList = document.createElement("ul");
  cardList.setAttribute("id", "card-list");
  cardContainer.setAttribute("id", "card-container");
  cardContainer.appendChild(cardList);
  root.appendChild(cardContainer);
  let start_page = 1;

  const updatePagination = (data, start_page) => {
    let box = document.querySelector("#pagination-container");
    if (!box) {
      box = document.createElement("ul");
      box.setAttribute("id", "pagination-container");
      cardContainer.appendChild(box);
    }
    box.innerHTML = pagination(data.total_pages, start_page);
  };

  const handleNextClick = async (data) => {
    if (start_page + 10 <= data.total_pages) {
      start_page += 10;
      updatePagination(data, start_page);
      addPaginationEventListeners(data);
      setActivePage(start_page);
      const newData = await getTopRatedMoviesList(start_page);
      const html = makeCards(newData);
      cardList.innerHTML = html;
    }
  };

  const handlePrevClick = async (data) => {
    if (start_page > 1) {
      start_page -= 10;
      updatePagination(data, start_page);
      addPaginationEventListeners(data);
      setActivePage(start_page + 9);
      const newData = await getTopRatedMoviesList(start_page);
      const html = makeCards(newData);
      cardList.innerHTML = html;
    }
  };
  const handleActivePageClick = async (event) => {
    if (event.target.classList.contains("page-number")) {
      document.querySelector(".page-number.active")?.classList.remove("active");
      event.target.classList.add("active");
      const newData = await getTopRatedMoviesList(
        Number(event.target.innerHTML)
      );
      const html = makeCards(newData);
      cardList.innerHTML = html;
    }
  };

  const addPaginationEventListeners = (data) => {
    const nextBtn = document.querySelector("#next");
    const prevBtn = document.querySelector("#prev");
    const pageNumbers = document.querySelectorAll(".page-number");
    if (nextBtn) {
      nextBtn.removeEventListener("click", handleNextClick);
      nextBtn.addEventListener("click", () => handleNextClick(data));
    }

    if (prevBtn) {
      prevBtn.removeEventListener("click", handlePrevClick);
      prevBtn.addEventListener("click", () => handlePrevClick(data));
    }
    pageNumbers.forEach((pageNumber) => {
      pageNumber.removeEventListener("click", handleActivePageClick);
      pageNumber.addEventListener("click", handleActivePageClick);
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

  try {
    const data = await getTopRatedMoviesList(start_page);
    const html = makeCards(data);
    cardList.innerHTML = html;
    cardContainer.addEventListener("click", (event) => {
      const cardBox = event.target.closest(".card-box");
      if (cardBox) {
        const id = cardBox.getAttribute("key");
        handleCardAlert(id);
      }
    });
    updatePagination(data, start_page);
    addPaginationEventListeners(data);
    setActivePage(start_page);
  } catch (error) {
    console.log(error);
  }
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
