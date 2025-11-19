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
            </div>
        </main>
    )
}