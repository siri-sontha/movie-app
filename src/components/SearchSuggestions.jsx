import React from 'react'

export default function SearchSuggestions({ title, poster_path, onClick }) {
    return (
        <div className="searchSuggestions" onClick={onClick}>
            <div>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w92/${poster_path}` : "/no-movie.png"} alt={title} />
                <p>{title}</p>
            </div>
        </div>
    )
}
