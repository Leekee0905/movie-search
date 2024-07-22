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

const handleSearchBtn = (event) => {
  event.preventDefault();
  const inputText = document.querySelector("#search-input").value;
  console.log(inputText);
  getTopRatedMoviesList();
};

export default createHeaderSearchInput;
