import { getPlayingMovies } from "./getData.js";

const renderCarousel = async () => {
  const root = document.querySelector("#root");
  const data = await getPlayingMovies();
  const movies = data.results;

  const header = root.querySelector("#header");

  const carouselTitle = document.createElement("h2");
  carouselTitle.innerHTML = "현재 상영중인 영화";

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel");

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("carousel-buttons");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("carousel-button", "prev");
  prevBtn.innerHTML = "<";

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("carousel-button", "next");
  nextBtn.innerHTML = ">";

  buttonContainer.appendChild(prevBtn);
  buttonContainer.appendChild(nextBtn);

  movies.forEach((e, index) => {
    const temp = `
    <div class="carousel-item">
      <img id=${index} class="content" src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt="..."/>
    </div>`;
    carouselInner.innerHTML += temp;
  });
  carouselContainer.appendChild(carouselInner);
  carouselContainer.appendChild(buttonContainer);
  root.insertBefore(carouselTitle, header.nextSibling);
  root.insertBefore(carouselContainer, carouselTitle.nextSibling);

  const itemsToShow = 4;
  const totalItems = movies.length;
  let index = 0;

  const updateCarousel = () => {
    const offset = -index * (100 / itemsToShow);
    carouselInner.style.transform = `translateX(${offset}%)`;
  };

  const showNextItem = () => {
    index = (index + itemsToShow) % totalItems;
    updateCarousel();
  };

  const showPrevItem = () => {
    index = (index - itemsToShow + totalItems) % totalItems;
    updateCarousel();
  };

  const startCarousel = () => setInterval(showNextItem, 5000);

  let carouselInterval = startCarousel();

  const stopCarousel = () => clearInterval(carouselInterval);

  nextBtn.addEventListener("click", () => {
    stopCarousel();
    showNextItem();
    carouselInterval = startCarousel();
  });

  prevBtn.addEventListener("click", () => {
    stopCarousel();
    showPrevItem();
    carouselInterval = startCarousel();
  });

  updateCarousel();
};

export default renderCarousel;
