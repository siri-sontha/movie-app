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
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const fetchSuggestions = async (query = '') => {
        if(!query.trim()) {
            setSuggestions([])
            return
        }

        try {
            const endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            const response = await fetch(endpoint, API_OPTIONS)

            const data = await response.json()
            setSuggestions((data.results || []).slice(0, 9))
        }
        catch {
            setSuggestions([])
        }
    }

    useDebounce(() => {fetchSuggestions(searchTerm)}, 400, [searchTerm])

    const handleSuggestionClick = (title) => {
        setSearchTerm(title)
        setSuggestions([])
        fetchMovies(title)
    }

    const fetchMovies = async (query = '') => {

        setIsLoading(true)
        setErrorMsg('')

    try {
        const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

        const response = await fetch(endpoint, API_OPTIONS)

        if(!response.ok) {
            throw new Error('Error Occurred! Failed to fetch results')
        }

        const data = await response.json()

        console.log(data)

        setResults(data.results || [])
    }
    catch(error) {
        setErrorMsg('There was an ERROR fetching results. Please try again later.')
    } finally {
        setIsLoading(false)
    }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    
  return (
    <main>
        <div className="pattern" />

        <div className="wrapper">
            <header>
                <img src="./hero.png" alt="hero banner" />
                <h1>Find <span className="text-gradient">results</span> you'll enjoy without the hassle</h1>
            
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                {searchTerm && suggestions.length > 0 && suggestions.map((movie) => (
                <SearchSuggestions key={movie.id} title={movie.title} poster_path={movie.poster_path} 
                                   onClick={() => handleSuggestionClick(movie.title)} />
                ))}
            </header>

            <section className="all-results">
                <h2 className="mt-[60px]">All results</h2>

                {isLoading ? (
                    // Loader or Spinner
                      <Spinner />
                ) : errorMsg ? (
                    // Error Message
                    <p className="text-red-500">{errorMsg}</p>
                ) : (
                    // results Data
                    <ul>
                        {results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    </main>
  )
}
