import React from 'react'

export default function SearchSuggestions( { title, onClick } ) {
    return (
        <div className="searchSuggestions" onClick={onClick}>
            <div>
                <p>{title}</p>
            </div>
        </div>
    )
}
