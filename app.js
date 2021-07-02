// selectors
const movieImage = document.querySelector(".movieImage");
const movieContainer = document.querySelector(".movieContainer");
const seriesContainer = document.querySelector(".seriesContainer");
const mainContainer = document.querySelector(".mainContainer");
const input = document.querySelector("#inputElement");
const searchButton = document.querySelector(".searchButton");
const searchInformation = document.querySelector(".searchInformation");
const movieFile = document.getElementByI;

// variables
let movies = "";
let series = "";
let searchHtml = "";
let clickedMovie;

// function for getting series data from OMDB API
async function fetchSeriesData(seriesTitle) {
	let response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "448c276c",
			t: `${seriesTitle}`,
		},
	});
	console.log(response.data);
	series += `<a id="${response.data.imdbID}" ><div class="movieCard">
	<img class="movieImage" src="${response.data.Poster}" alt="" />
	<p class="description">${seriesTitle}</p>
  </div></a>`;
	seriesContainer.innerHTML = series;
}

// function for getting movie data from OMDB API
async function fetchMovieData(movieTitle) {
	let response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "448c276c",
			t: `${movieTitle}`,
		},
	});
	console.log(response.data);
	movies += `<a id="${response.data.imdbID}"><div class="movieCard">
	<img class="movieImage" src="${response.data.Poster}" alt="" />
	<p class="description">${movieTitle}</p>
</div></a>`;
	movieContainer.innerHTML = movies;
}

//call back function for eventlistener for diplaying specific movie or series inforamtion
function displayInformation(e) {
	let item = e.target;
	
	console.log(item);
	console.log(item.parentElement);
	if (item.classList[0] === "movieCard") {
		console.log(item.children[1].innerHTML);
		item.parentElement.href = `/details.html?name=${item.parentElement.id}`;
	}
}
// function for fetching data for particular movie or episode

// eventlisteners
document.addEventListener("click", displayInformation);

//arrays
let movieList = [
	"Avengers",
	"Man of Steel",
	"Tenet",
	"Aquaman",
	"Venom",
	"John Wick",
	"Thor",
	"Bloodshot",
	"Tomb Raider",
	"Rampage",
];
let seriesList = [
	"Game of thrones",
	"The 100",
	"Jessica Jones",
	"Arrow",
	"Money Heist",
	"Healer",
	"The K2",
	"Love Alarm",
	"W",
	"Daredevil",
];

//loops
for (const movieTitle of movieList) {
	fetchMovieData(movieTitle);
}
for (const seriesTitle of seriesList) {
	fetchSeriesData(seriesTitle);
}

// on search movie
async function onInput(e) {
	let response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "448c276c",
			s: `${input.value}`,
		},
	});
	console.log(response.data.Response);
	if (response.data.Response === "True") {
		console.log(response.data);
		for (let i = 0; i < response.data.Search.length; i++) {
			searchHtml += `<a id="${response.data.Search[i].imdbID}" ><div  class="movieCard">
			<img class="movieImage" src="${response.data.Search[i].Poster}" alt="" />
			<p class="description">${response.data.Search[i].Title} (${response.data.Search[i].Year})</p>
					</div></a>`;
		}
		searchInformation.innerHTML = searchHtml;
		searchHtml = "";
	} else {
		searchInformation.innerHTML = `<p class="error">No Results!</p>`;
	}
}
// event listeners for searching
searchButton.addEventListener("click", onInput);
input.addEventListener("keyup", function (ev) {
	if (ev.key === "Enter") {
		onInput();
	}
});
