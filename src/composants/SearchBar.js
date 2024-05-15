import React from 'react';
import '../css/SearchBar.css';

function SearchBar({ searchText, setSearchText }) {
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher un nom d'élève"
                value={searchText}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchBar;
