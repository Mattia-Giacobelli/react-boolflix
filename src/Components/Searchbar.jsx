import { useMovies } from "../Contexts/MoviesProvider"


export default function SearchBar() {

    const { searchInput, setSearchInput, getMoviesAndTv } = useMovies()


    return (

        <div className="search">
            <form onSubmit={e => getMoviesAndTv(e)} >
                <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
                    type="text" className="my-input" placeholder="Search movies by title" />
                <button
                    className="my-btn" type="submit">
                    <i class="bi bi-search"></i>
                </button>
            </form>
        </div>
    )
}