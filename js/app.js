const searchField = document.getElementById("search-field");
const searchList = document.getElementById('search-list');
const resultContainer = document.getElementById('result-grid');

let key = "be5ab18f";
// fetch movie api
const fetchMovie = async (searchTerm) => {
  const url = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "True") displaySearchMovie(data.Search);
};
// movieSearch function input field keyup and click
const movieSearch = () => {
  const searchFieldValue = searchField.value.trim();
  // console.log(searchFieldValue);
  if (searchFieldValue.length > 0) {
    searchList.classList.remove('hide-search-list');
    fetchMovie(searchFieldValue);
  } else {
    searchList.classList.add('hide-search-list');
  }
};
// display search movie from api
const displaySearchMovie = (search) => {
  searchList.innerHTML ='';
  // console.log(search);
  search.forEach(element => {
    // console.log(element);
    let movieListItem = document.createElement('div');
    movieListItem.dataset.id = element.imdbID;
    movieListItem.classList.add('search-list-item');
    movieListItem.innerHTML = `
      <div class = "search-item-thumbnail">
          <img src = "${(element.Poster != "N/A") ? element.Poster : "image_not_found.png"}">
      </div>
      <div class = "search-item-info">
          <h3>${element.Title}</h3>
          <p>${element.Year}</p>
      </div>
      `
      searchList.appendChild(movieListItem);
  });
  loadMovieDetails();

};
const loadMovieDetails = () =>{
  const searchMovieList = document.querySelectorAll('.search-list-item');
  searchMovieList.forEach(movie=> {
    movie.addEventListener('click', async() => {
      // console.log(movie.dataset.id);
      searchList.classList.add('hide-search-list');
      searchField.value = '';
      const res = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`)
      const data = await res.json()
      showMovieDetails(data);

    })
  })
}

const showMovieDetails = (data) =>{
  console.log(data);
  resultContainer.innerHTML=`
    <div class = "movie-poster">
        <img src = "${data.Poster !== 'N/A' ? data.Poster : 'image_not_found.png'}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${data.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${data.Year}</li>
            <li class = "rated">Ratings: ${data.Rated}</li>
            <li class = "released">Released: ${data.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${data.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${data.Writer}</p>
        <p class = "actors"><b>Actors: </b>${data.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${data.Plot}</p>
        <p class = "language"><b>Language:</b> ${data.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${data.Awards}</p>
    </div>
    `

}



// Search btn addEventListener
document.getElementById("search-btn").addEventListener("click", function () {
  fetchMovie(searchField.value);
});