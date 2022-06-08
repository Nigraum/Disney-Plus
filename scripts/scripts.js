const API_KEY = 'f3548c64fd91ca79a83e0fd855d2ca79'
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'
const LIST_MOVIES = ['tt5613484', 'tt4846232', 'tt1032755', 'tt0113540', 'tt0355702', 'tt0117951', 'tt5727208', 'tt2210479', 'tt2358913', 'tt2358911']

const moviesList = document.getElementById('movies__list')

function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
}

function setMainMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const appImage = document.querySelector('.app_image img')

    const title = document.querySelector('.feature_movie h1')
    const description = document.querySelector('.feature_movie p')
    const info = document.querySelector('.feature_movie span')
    const rate = document.querySelector('.rate strong')

    const yearRelease = data.release_date.split('-')[0]

    title.innerHTML = data.title
    description.innerHTML = data.overview
    rate.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'

    const image = BASE_URL_IMAGE.concat(data.backdrop_path)
    appImage.setAttribute('src', image)
   
  })
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `setMainMovie('${movieId}')`)
  button.innerHTML = '<img src="/assets/icon-play-button.png" alt="Icon play button" />'

  return button
}

function createImageMovie(movieImage, movieTitle) {
  const image = document.createElement('img')

  const divImageMovie = document.createElement('div')
  divImageMovie.classList.add('movie_image')

  image.setAttribute('src', movieImage)
  image.setAttribute('alt', `Film Image ${movieTitle}`)
  image.setAttribute('loading', 'lazy')

  divImageMovie.appendChild(image)

  return divImageMovie
}

function createMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
    const movie = document.createElement('li')
    const genre = `<span>${data.genres[0].name}</span>`
    const title = `<strong>${data.title}</strong>`
    const image = BASE_URL_IMAGE.concat(data.backdrop_path)

    movie.innerHTML = genre + title
    movie.appendChild(createButtonMovie(movieId))
    movie.appendChild(createImageMovie(movieId))
    movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`
    moviesList.appendChild(movie)
  })
}

function loadListMovies() {
  LIST_MOVIES.map(createMovie) 
}

//loadListMovies()

setMainMovie(LIST_MOVIES[0])
