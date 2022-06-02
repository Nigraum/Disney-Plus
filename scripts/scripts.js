const API_KEY = 'f3548c64fd91ca79a83e0fd855d2ca79'
const LIST_MOVIES = ['tt5613484', 'tt1032755', 'tt4846232', 'tt0113540', 'tt0355702', 'tt0117951' ]
const BUTTON_PLAY = '<button type="button"><img src="../assets/icon-play-button.png" alt="Icon play button"></button>'

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
}

fetch(getUrlMovie(LIST_MOVIES[0])).then(response => response.json()).then(data => {
        console.log(data)
        const app = document.getElementById('app')

        const title = document.querySelector('.movie h1')
        const description = document.querySelector('.movie p')
        const rate = document.querySelector('.rate strong')
        const info = document.querySelector('.movie span')

        const yearRelease = data.release_date.split('-')[0]

        title.innerHTML = data.title
        description.innerHTML = data.overview
        rate.innerHTML = data.vote_average
        info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie '

        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        app.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`

    })


const moviesList = document.getElementById('movies_list')

function createMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const movie = document.createElement('li')
    const genre = `<span>${data.genres[0].name}</span>`
    const title = `<strong>${data.title}</strong>`
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)

    movie.innerHTML = genre + title
    movie.appendChild(createButtonMovie(movieId))
    movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`
    moviesList.appendChild(movie)
  })
}

function loadListMovies() {
  LIST_MOVIES.map(createMovie)
}

loadListMovies()


