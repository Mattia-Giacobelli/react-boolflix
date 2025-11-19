import { createContext, useContext, useState } from "react";

const MoviesContext = createContext()

function MoviesProvider({ children }) {

    const [movies, setMovies] = useState([])
    const [searchedMovies, setSearchedMovies] = useState(movies)
    const [searchInput, setSearchInput] = useState('')


    return (
        <MoviesContext.Provider
            value={{
                movies, setMovies, searchInput, setSearchInput,
                searchedMovies, setSearchedMovies
            }}>
            {children}
        </MoviesContext.Provider>
    )
}


function useMovies() {
    const context = useContext(MoviesContext);
    return context
}

export { MoviesProvider, useMovies }