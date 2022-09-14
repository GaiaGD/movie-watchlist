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

    oldMovieEntry.unshift(newMovieEntry);
    localStorage.setItem('itemsArray', JSON.stringify(oldMovieEntry));
}

function removeFromWatchlist(event){
    let idToRemove = event.target.id;
    watchlist.map(addedMovie => {
        if (idToRemove == addedMovie.IMBD){
            watchlist.splice(addedMovie, 1);
        }
    })
    localStorage.setItem('itemsArray', JSON.stringify(watchlist))
    location.reload(true)
}

let loadWatchlist = () => {
    let emptyWatchlist = `
    <div class="empty d-flex justify-content-center align-items-center">
        <div class="p-2">
            <h5 class="mt-4 grey-text text-center">Your watchlist is looking a little empty...</h5>
            <a href="index.html">
                <a class="d-flex mt-4 justify-content-center align-items-center" href="index.html">
                    <span>
                        <img class="p-2 add" src="./img/add.png"/>
                    </span>
                    <p class="m-2">Let’s add some movies!</p>
                </a>
            </a>
        </div>
    </div>`

    if(localStorage.length > 0) {
        watchlist = JSON.parse(localStorage.itemsArray)
        if(watchlist.length > 0){
            for (let WLmovie of watchlist){
            
                watchlistToShow += `
                <div class="movie-title d-sm-none d-block col">${WLmovie.title}</div>

                <div class="d-flex justify-content-center align-items-center my-3 pb-5 bottom-line">
                    <div class="col-sm-3 col-4">
                        <img class="poster" src="${WLmovie.poster}" />
                    </div>
                    <div class="col">
                        <div class="row-two d-flex">
                            <span class="movie-title pr-3 d-none d-sm-block">${WLmovie.title}</span>
                            <span class="rating pr-1">
                                <img class="star" src="./img/star.png"/></span>
                                <span>${WLmovie.rating.length > 0 ? WLmovie.rating[0].Value : ratingNA}</span>
                        </div>

                        <div class="row col justify-content-between">
                            <p class="pr-3 m-0 info">${WLmovie.runtime}, ${WLmovie.genre}</p>
                            <div class="col-sm-3 col-12 watchlist-button d-flex justify-content-sm-between align-items-center justify-content-center">
                                <img class="p-1 mb-1 mr-1 add" src="./img/remove.png"/>
                                <p id="${WLmovie.IMBD}" class="mb-0" onclick="removeFromWatchlist(event)">Remove</p>
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
        } else {
            document.getElementById('watchlist').innerHTML = emptyWatchlist
        }
    } else {
        document.getElementById('watchlist').innerHTML = emptyWatchlist
    }
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
                <div class="row justify-content-between">
                    <p class="col-sm-6 col-12 pr-3 m-0 info">${singleMovie.Runtime}, ${singleMovie.Genre}</p>
                    <div class="col-sm-3 col-12 watchlist-button d-flex justify-content-sm-between align-items-center justify-content-center">
                        <img id="${singleMovie.imdbID}" onclick="addToWatchlist(event)" class="p-1 mb-1 mr-1 add" src="./img/add.png"/>
                        <p id="${singleMovie.imdbID}" class="mb-0" onclick="addToWatchlist(event)">Watchlist</p>
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