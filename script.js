let apiKey = "685b2f86"
let movieResult = ''
let watchlistRaw = []
let watchlistToShow = ''
let ratingNA = "NA"

async function addToWatchlist(event){
    let idToAdd = event.target.id;

    const res3 = await fetch (`https://www.omdbapi.com/?i=${idToAdd}&apikey=685b2f86`)
    const WLmovie = await res3.json()

    let oldMovieEntry = JSON.parse(localStorage.getItem('itemsArray')) || [];

    let newMovieEntry = {
        'poster': WLmovie.Poster,
        'title': WLmovie.Title,
        'rating': WLmovie.Ratings,
        'duration': WLmovie.Runtime,
        'genre': WLmovie.Genre,
        'plot': WLmovie.Plot,
        'IMBD': WLmovie.imdbID
    };

    oldMovieEntry.push(newMovieEntry);

    localStorage.setItem('itemsArray', JSON.stringify(oldMovieEntry));
    console.log(localStorage.itemsArray)

}

function removeFromWatchlist(event){
    let idToRemove = event.target.id;
    console.log(idToRemove)
}

if(localStorage.length > 0) {
    console.log(localStorage)
    watchlist = JSON.parse(localStorage.itemsArray)

    for (let WLmovie of watchlist){
    
        watchlistToShow += `
        <div class="d-flex justify-content-center align-items-center my-3 pb-5 bottom-line">
            <div class="col-sm-3 col-4">
                <img class="poster" src="${WLmovie.poster}" />
            </div>
            <div class="col">
                <div class="row-two d-flex">
                    <span class="movie-title pr-3">${WLmovie.title}</span>
                    <span class="rating pr-1">
                        <img class="star" src="./img/star.png"/></span>
                        <span>${WLmovie.rating.length > 0 ? WLmovie.rating[0].Value : ratingNA}</span>
                </div>
                <div class="row-two d-flex justify-content-between align-items-center">
                    <p class="pr-3 m-0 info">${WLmovie.runtime}, ${WLmovie.genre}</p>
                    <div id="${WLmovie.IMBD}" class="watchlist-button" onclick="removeFromWatchlist(event)" >
                        <img class="p-1 mb-1 add" src="./img/add.png"/> Watchlist
                    </div>
                </div>
                <div class="row-three mt-2">
                    <p class="plot">${WLmovie.plot}</p>
                </div>
            </div>
        </div>
        <hr>
        `
    }
    
    document.getElementById('watchlist').innerHTML = watchlistToShow
}


async function getMovieResults(event){
    event.preventDefault()
    let titleTyped = document.getElementById("titleTyped").value

    const res = await fetch (`https://www.omdbapi.com/?apikey=${apiKey}&s=${titleTyped}&plot=short&r=json`)
    const data = await res.json()
    let rawResults = data.Search
    movieResult = ''


    for (let movie of rawResults){
        let IMDBcode = movie.imdbID

        const res2 = await fetch (`https://www.omdbapi.com/?i=${IMDBcode}&apikey=685b2f86`)
        const singleMovie = await res2.json()


        movieResult += `
        <div class="d-flex justify-content-center align-items-center my-3 pb-5 bottom-line">
            <div class="col-sm-3 col-4">
                <img class="poster" src="${movie.Poster}" />
            </div>
            <div class="col">
                <div class="row-two d-flex">
                    <span class="movie-title pr-3">${movie.Title}</span>
                    <span class="rating pr-1">
                        <img class="star" src="./img/star.png"/></span>
                    <span>${singleMovie.Ratings.length > 0 ? singleMovie.Ratings[0].Value : ratingNA}</span>
                </div>
                <div class="row-two d-flex justify-content-between align-items-center">
                    <p class="pr-3 m-0 info">${singleMovie.Runtime}, ${singleMovie.Genre}</p>
                    <div id="${singleMovie.imdbID}" class="watchlist-button" onclick="addToWatchlist(event)" >
                        <img class="p-1 mb-1 add" src="./img/add.png"/> Watchlist
                    </div>
                </div>
                <div class="row-three mt-2">
                    <p class="plot">${singleMovie.Plot}</p>
                </div>
            </div>
        </div>
        <hr>
        `
    }

    document.getElementById('results').innerHTML = movieResult
}



// to fix
// - + watchilist doesn't work
// error handling
// numbers?