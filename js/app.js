const searchField = document.getElementById("search-field");
const searchList = document.getElementById('search-list');

let key = "be5ab18f";
// fetch movie api
const fetchMovie = async (searchTerm) => {
  const url = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "True") displaySearchMovie(data);
};
// movieSearch function input field keyup and click
const movieSearch = () => {
  const searchFieldValue = searchField.value.trim();
  console.log(searchFieldValue);
  if (searchFieldValue.length > 0) {
    fetchMovie(searchFieldValue);
  } else {
    console.log("object");
  }
};
// display search movie from api
const displaySearchMovie = (search) => {
  console.log(search);
};
// Search btn addEventListener
document.getElementById("search-btn").addEventListener("click", function () {
  fetchMovie(searchField.value);
});
