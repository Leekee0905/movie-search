import makeDataToCards, { makeCards } from "./card.js";
import getTopRatedMoviesList from "./getData.js";

const createHeaderSearchInput = () => {
  const createHeader = document.createElement("div");
  const headerTitle = document.createElement("h1");
  const searchInput = document.createElement("input");
  const submitBtn = document.createElement("button");
  const formBox = document.createElement("form");
  createHeader.setAttribute("id", "header");
  searchInput.setAttribute("id", "search-input");
  searchInput.setAttribute("name", "keyword");
  searchInput.autofocus = true;
  headerTitle.onclick = navigateHeaderTitle;
  headerTitle.innerHTML = "LGS-Movie";
  formBox.setAttribute("id", "search-form");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("id", "search-btn");
  submitBtn.innerHTML = "검색";
  document.querySelector("#root").appendChild(createHeader);
  document.querySelector("#header").appendChild(headerTitle);
  document.querySelector("#header").appendChild(formBox);
  document.querySelector("#search-form").appendChild(searchInput);
  document.querySelector("#search-form").appendChild(submitBtn);
  document.querySelector("#search-form").onsubmit = (event) =>
    handleSearchBtn(event);
};

const navigateHeaderTitle = () => {
  const path = (window.location.pathname = "/").split("/")[1];
  window.location.pathname = `/${path}/`;
};

const handleSearchBtn = async (event) => {
  event.preventDefault();
  const inputText = document.querySelector("#search-input").value;
  const cardList = document.querySelector("#card-list");
  if (inputText === "") {
    alert("검색어를 입력해주세요.");
  } else {
    const listHTML = await makeCards(inputText);
    const noResult = document.createElement("div");
    noResult.setAttribute("id", "no-result");
    noResult.textContent = "검색결과가 없습니다.";
    console.log(listHTML);
    cardList.innerHTML = listHTML;
    if (listHTML === "") {
      cardList.appendChild(noResult);
    }
  }
  document.querySelector("#search-input").value = "";
};

export default createHeaderSearchInput;
