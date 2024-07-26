import { makeCards } from "./card.js";
import { getTopRatedMoviesList } from "./getData.js";

const createHeaderSearchInput = () => {
  const createdHeader = document.createElement("div");
  const headerTitle = document.createElement("h1");
  const searchInput = document.createElement("input");
  const submitBtn = document.createElement("button");
  const formBox = document.createElement("form");

  createdHeader.id = "header";

  searchInput.id = "search-input";
  searchInput.setAttribute("name", "keyword");
  searchInput.autofocus = true;

  headerTitle.onclick = navigateHeaderTitle;
  headerTitle.innerHTML = "LGS-Movie";

  formBox.id = "search-form";

  submitBtn.setAttribute("type", "submit");
  submitBtn.id = "search-btn";
  submitBtn.innerHTML = "검색";

  document.querySelector("#root").appendChild(createdHeader);
  document.querySelector("#header").appendChild(headerTitle);
  document.querySelector("#header").appendChild(formBox);
  document.querySelector("#search-form").appendChild(searchInput);
  document.querySelector("#search-form").appendChild(submitBtn);
  document.querySelector("#search-form").onsubmit = (event) =>
    handleSearchBtn(event);
};

const navigateHeaderTitle = () => {
  window.location.href = "/movie-search";
};

const handleSearchBtn = async (event) => {
  event.preventDefault();
  const currentPage = Number(document.querySelector(".active").innerHTML);
  const inputText = document.querySelector("#search-input").value;
  const cardList = document.querySelector("#card-list");
  if (inputText === "") {
    alert("검색어를 입력해주세요.");
  } else {
    const data = await getTopRatedMoviesList(currentPage);
    const listHTML = await makeCards(data, inputText);
    const noResult = document.createElement("div");
    noResult.setAttribute("id", "no-result");
    noResult.textContent = "검색결과가 없습니다.";
    cardList.innerHTML = listHTML;
    if (listHTML === "") {
      cardList.appendChild(noResult);
    }
  }
  document.querySelector("#search-input").value = "";
};

export default createHeaderSearchInput;
