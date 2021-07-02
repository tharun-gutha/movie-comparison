const urlParms = new URLSearchParams(window.location.search);
let movieName = urlParms.get("name");
const informationContainer = document.querySelector(".informationContainer");
const episodesContainer = document.querySelector(".episodesContainer");
let seasons;
let seasonsData;

async function movieData(movieName) {
	let response = await axios.get("http://www.omdbapi.com/", {
		params: {
			apikey: "448c276c",
			i: `${movieName}`,
		},
	});
	console.log(response.data);
	informationContainer.innerHTML = `<div class="movieImage"><img src="${response.data.Poster}" alt=""></div>
	<div class="movieInformation">
		<h2><span>Title </span>   : ${response.data.Title}</h2>
		<p><span>Actors</span>    : ${response.data.Actors}</p>
		<p><span>BoxOffice</span> : ${response.data.BoxOffice}</p>
		<p><span>Director</span>  : ${response.data.Director}</p>

		<div class="detailsInnerContainer">
			<p class="detailsSubHeading"><span>About :</span></p>
		 	<p class="detailsText">${response.data.Plot}</p>
		</div>
		
		<p><span>Rating</span>    : ${response.data.imdbRating}</p>
		<p><span>Released</span>  : ${response.data.Released}</p>
		<p><span>Year</span>      : ${response.data.Year}</p>
		<p><span>Awards</span>    : ${response.data.Awards}</p>
		<p><span>Genre </span>    : ${response.data.Genre}</p>
		<p><span>Type </span>     : ${response.data.Type}</p>
	</div>`;
	seasons = response.data.totalSeasons;
	if (response.data.Type === "series") {
		async function x(movieName, i) {
			let response = await axios.get("http://www.omdbapi.com/", {
				params: {
					apikey: "448c276c",
					i: `${movieName}`,
					Season: i,
				},
			});
			console.log(response.data);
		}

		for (let i = 1; i <= seasons; i++) {
			seasonsData = await x(movieName, i);

			// let episodes +=
		}
	}
}
movieData(movieName);
console.log(seasonsData);
