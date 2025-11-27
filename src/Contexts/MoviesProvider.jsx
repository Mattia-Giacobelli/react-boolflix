import { createContext, useContext, useState, useEffect } from "react";
import uk from '../assets/img/uk.png'
import it from '../assets/img/it.png'
import fr from '../assets/img/fr.png'
import es from '../assets/img/es.png'
import de from '../assets/img/de.png'

const MoviesContext = createContext()

function MoviesProvider({ children }) {

    //Create varibles to store data
    const [movies, setMovies] = useState([])
    const [tvSeries, setTvSeries] = useState([])
    const [searched, setSearched] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [cast, setCast] = useState([])
    const [id, setId] = useState(null)
    const [castString, setCastString] = useState('')
    const [movieOrTV, setMovieOrTV] = useState('Movie/TV filter')
    const [genres, setGenres] = useState([])
    const [selectedGenre, setselectedGenre] = useState(0)
    const [genreFiltered, setGenreFiltered] = useState([])



    //Create object with a flag for each language
    const flags = {
        en: uk,
        it: it,
        fr: fr,
        es: es,
        de: de,
    }

    //API key
    const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY

    //Create function to fetch movies and tvSeries data
    function getMoviesAndTv(e) {

        e.preventDefault()

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&language=it_IT&query=${searchInput}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setMovies(res.results)
            })


        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${movieApiKey}&language=it_IT&query=${searchInput}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(Math.ceil(res.results[0].vote_average));
                setTvSeries(res.results)

            })


    }

    //Get cast members
    function fetchFilmCast(id) {

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${movieApiKey}`)
            .then((res) => res.json())
            .then((res) => {
                const castList = []
                console.log(res, '👍');
                for (let i = 0; i < 5; i++) {

                    const actor = res.cast[i]?.name;
                    console.log(actor, '👌');

                    castList.push(actor)

                }
                console.log(castList);
                setCast(castList)
            })


    }

    function fetchTVCast(id) {

        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${movieApiKey}`)
            .then((res) => res.json())
            .then((res) => {
                const castList = []
                for (let i = 0; i < 5; i++) {
                    const actor = res.cast[i]?.name;
                    castList.push(actor)

                }
                console.log(castList);

                setCast(castList)
            })


    }

    function fetchGenres() {

        if (movieOrTV === 'movie') {

            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}&language=it_IT`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.genres);
                    setGenres(res.genres)
                })

        } else if (movieOrTV === 'TV') {
            fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${movieApiKey}&language=it_IT`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res.genres);
                    setGenres(res.genres)
                })
        }
    }

    return (
        <MoviesContext.Provider
            value={{
                movies, setMovies, searchInput, setSearchInput,
                searched, setSearched, flags,
                tvSeries, setTvSeries, getMoviesAndTv,
                fetchFilmCast, fetchTVCast, cast,
                id, setId, castString, setCastString, movieOrTV, setMovieOrTV,
                fetchGenres, genres, genreFiltered, setGenreFiltered,
                selectedGenre, setselectedGenre
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