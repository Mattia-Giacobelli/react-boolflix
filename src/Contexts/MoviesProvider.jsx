import { createContext, useContext, useState } from "react";
import uk from '../assets/img/uk.png'
import it from '../assets/img/it.png'
import fr from '../assets/img/fr.png'
import es from '../assets/img/es.png'
import de from '../assets/img/de.png'

const MoviesContext = createContext()

function MoviesProvider({ children }) {

    const [movies, setMovies] = useState([])
    const [tvSeries, setTvSeries] = useState([])
    const [searched, setSearched] = useState([])
    const [searchInput, setSearchInput] = useState('')

    //Create object with flag emoji for each language
    const flags = {
        en: uk,
        it: it,
        fr: fr,
        es: es,
        de: de,
    }

    return (
        <MoviesContext.Provider
            value={{
                movies, setMovies, searchInput, setSearchInput,
                searched, setSearched, flags,
                tvSeries, setTvSeries
            }
            }>
            {children}
        </MoviesContext.Provider >
    )
}


function useMovies() {
    const context = useContext(MoviesContext);
    return context
}

export { MoviesProvider, useMovies }