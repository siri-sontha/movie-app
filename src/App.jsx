import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import SearchSuggestions from './components/SearchSuggestions'

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export default function App() {

    const [searchTerm, setSearchTerm] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchMovies = async (query = '') => {

        setIsLoading(true)
        setErrorMsg('')

    try {
        const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok) {
            throw new Error('Error Occurred! Failed to fetch movies')
        }

        const data = await response.json()

        console.log(data)

        if(data.response == 'False') {
            setErrorMsg(data.Error || 'Fetch failure')
            setMovies([])
            return
        }

        setMovies(data.results || [])
    }
    catch(error) {
        setErrorMsg('There was an ERROR fetching movies. Please try again later.')
    } finally {
        setIsLoading(false)
    }
}

    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    
  return (
    <main>
        <div className="pattern" />

        <div className="wrapper">
            <header>
                <img src="./hero.png" alt="hero banner" />
                <h1>Find <span className="text-gradient">Movies</span> you'll enjoy without the hassle</h1>
            
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {searchTerm && movies.slice(0, 9).map((movie) => (
                <SearchSuggestions key={movie.id} title={movie.title} onClick={() => setSearchTerm(movie.title)} />
                ))}
            </header>

            <section className="all-movies">
                <h2 className="mt-[60px]">All Movies</h2>

                {isLoading ? (
                    // Loader or Spinner
                      <Spinner />
                ) : errorMsg ? (
                    // Error Message
                    <p className="text-red-500">{errorMsg}</p>
                ) : (
                    // Movies Data
                    <ul>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    </main>
  )
}
