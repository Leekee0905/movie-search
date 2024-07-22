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
    const data = await getTopRatedMoviesList();
    const cardData = data.results;
    console.log(cardData);

    const html = cardData
      .map((element, index) => {
        return `
        <li class="card-list-contents">
          <div class="card-box" key=${index}>
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
              ${element.vote_average}
            </div>
          </div>
        </li>
      `;
      })
      .join("");
    document
      .querySelectorAll("#card-list")
      .forEach((e) => (e.innerHTML = html));
  } catch (error) {
    console.log(error);
  }
};

export default makeDataToCards;
