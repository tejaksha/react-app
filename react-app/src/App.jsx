import React, { useState, useEffect } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchMovies = async (query = '') => {
    try {
        setIsLoading(true)
        setErrorMessage('')
        const endpoint = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
        const response = await fetch(endpoint, API_OPTIONS)
        console.log(API_KEY)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (data.Response === 'False') {
           setErrorMessage(data.Error || 'Failed to fetch movies')
           setMoviesList([]);
           return;
        }
        setMoviesList(data.results || [])
        setIsLoading(false)
        console.log(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage('Error fetching movies. Please try again later.')
    }finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies(searchTerm)
  }, [searchTerm])
  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find<span className='text-gradient'> Movies </span> You'll Enjoy without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className='all-movies'>
            <h2 className='text-white text-2xl font-bold'>All Movies</h2>
            {isLoading ? ( 
              <Spinner /> 
             ) : errorMessage ? (
             <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {moviesList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
          

          <h1 className='text-white text-3xl'>{searchTerm}</h1>
        </div>
      </div>
    </main>
  )
}

export default App
