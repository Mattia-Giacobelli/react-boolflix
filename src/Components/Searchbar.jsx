import { useMovies } from "../Contexts/MoviesProvider"


export default function SearchBar() {

    const { searchInput, setSearchInput, getMoviesAndTv,
        movieOrTV, setMovieOrTV
    } = useMovies()


    return (

        <div className="search">
            <form onSubmit={e => getMoviesAndTv(e)} >


                <div className="input-group">
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
                        type="text" className="my-input" placeholder="Search movies by title" />
                    <button
                        className="my-btn" type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}