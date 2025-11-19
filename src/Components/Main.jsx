import { useEffect } from "react";
import { useMovies } from "../Contexts/MoviesProvider";

export default function Main() {

    const { searchInput, setSearchInput, searchedMovies, setSearchedMovies } = useMovies()

    const movieApiKey = import.meta.env.VITE_MOVIE_API_KEY




    function getSearchedItems() {

        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${movieApiKey}&language=it_IT&query=${searchInput}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setSearchedMovies(res.results)
            })

    }

    // useEffect(getSearchedItems, [])

    return (
        <main>
            <div className="container">
                <div className="input-group mb-3">
                    <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
                        type="text" className="form-control" placeholder="Search movies by title" aria-label="Search movies by title"
                        aria-describedby="button-addon2" />
                    <button onClick={getSearchedItems}
                        className="btn btn-outline-secondary" type="button" id="button-addon2">
                        Search
                    </button>
                </div>

                <div className="row">
                    {searchedMovies.map(movie => {
                        return (
                            <div key={movie.id} className="col-3">
                                <div className="card">
                                    {/* <img className="card-img-top" src={`${movie.poster_path}`} alt="movie-img" /> */}
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.name}</h5>
                                        <h5 className="card-title">{movie.original_name}</h5>
                                        <p className="card-text">{movie.original_language}</p>
                                        <p className="card-text">{movie.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}