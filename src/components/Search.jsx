import React from 'react'

export default function Search({ searchTerm, setSearchTerm }) {

    const handleChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
        console.log(value)
    }

  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input type="text" 
            placeholder="Search through thousands of movies" 
            value={searchTerm}
            onChange={handleChange}
            />
        </div>
    </div>
  )
}
