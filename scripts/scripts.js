const API_KEY = 'f3548c64fd91ca79a83e0fd855d2ca79'
const BASE_URL_IMAGE = {
  original: 'https://image.tmdb.org/t/p/original',
  small: 'https://image.tmdb.org/t/p/w500/'
}
const movies = []
let movieActive = 'tt5613484'
const moviesElement = document.getElementById('movies')

function getUrlMovie(movieId) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
}

function changeButtonMenu() {
  const button = document.querySelector('.button_menu')
  const navigation = document.querySelector('.navigation')

  button.classList.toggle('active')
  navigation.classList.toggle('active')

}

function setMainMovie(movie) {
    const appImage = document.querySelector('.app_image img')
    const title = document.querySelector('.feature_movie h1')
    const description = document.querySelector('.feature_movie p')
    const info = document.querySelector('.feature_movie span')
    const rate = document.querySelector('.rate strong')


    title.innerHTML = movie.title
    description.innerHTML = movie.overview
    rate.innerHTML = movie.vote_average
    info.innerHTML = movie.release + ' - ' + movie.genre + ' - Movie'

    appImage.setAttribute('src', movie.image.original)
   
}

function changeMovieActiveInList(newMovieActive) {
  const movieActiveCurrent = document.getElementById(movieActive)
  movieActiveCurrent.classList.remove('active-movie')

  const movieActiveNew = document.getElementById(newMovieActive)
  movieActiveNew.classList.remove('active-movie')

  movieActive = newMovieActive
}

function changeMainMovie(movieId) {
  changeMovieActiveInList(movieId)

  const movie = movies.find(movie =>movie.id === movieId)

  setMainMovie(movie)
  changeButtonMenu()
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `changeMainMovie('${movieId}')`)
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

function addMovieInList(movie) {
  const movieElement = document.createElement('li')
  movieElement.classList.add('movie')

  movieElement.setAttribute('id', movie.id)

  const genre = `<span>${movie.genre}</span>`
  const title = `<strong>${movie.title}</strong>`

  movieElement.innerHTML = genre + title
  movieElement.appendChild(createButtonMovie(movie.id))
  movieElement.appendChild(createImageMovie(movie.image.small, movie.title))
    
  moviesElement.appendChild(movieElement)
}

function loadMovies() {
  const LIST_MOVIES = ['tt5613484', 'tt4846232', 'tt1032755', 'tt0113540', 'tt0355702', 'tt0117951', 'tt5727208', 'tt2210479', 'tt2358913', 'tt2358911']
  
  LIST_MOVIES.map((movie, index) => {
    fetch(getUrlMovie(movie)).then(response => response.json()).then(data => {

      const movieData = {
        id: movie,
        title: data.title,
        overview: data.overview,
        vote_average: data.vote_average,
        genre: data.genres[0].name,
        release: data.release_date.split('-')[0],
        image: {
          original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
          small: BASE_URL_IMAGE.small.concat(data.backdrop_path),
        }
      }

      movies.push(movieData)

      if (index === 0) {
        setMainMovie(movieData)
      }

      addMovieInList(movieData)
    })
  })
}

loadMovies()