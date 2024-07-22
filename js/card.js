import getTopRatedMoviesList from "./getData.js";

const makeDataToCards = async () => {
  const root = document.querySelector("#root");
  const cardContainer = document.createElement("div");
  const cardList = document.createElement("ul");
  cardList.setAttribute("id", "card-list");
  cardContainer.setAttribute("id", "card-container");
  cardContainer.appendChild(cardList);
  root.appendChild(cardContainer);
  try {
    const html = await makeCards();
    cardList.innerHTML = html;
    cardContainer.addEventListener("click", (event) => {
      const cardBox = event.target.closest(".card-box");
      if (cardBox) {
        const id = cardBox.getAttribute("key");
        handleCardAlert(id);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const handleCardAlert = (id) => {
  alert(`영화 id: ${id}`);
};

export const makeCards = async (keyword) => {
  const data = await getTopRatedMoviesList();
  const cardData = keyword
    ? data.results.filter((e) => e.title.includes(keyword))
    : data.results;

  const html = cardData
    .map((element) => {
      return `
          <li class="card-list-contents">
            <div class="card-box" key=${element.id}>
              <div class="card-image">
                  <img src="https://image.tmdb.org/t/p/w200${element.poster_path}" alt="..."/>
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
