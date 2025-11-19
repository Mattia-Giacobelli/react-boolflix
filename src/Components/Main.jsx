import { useEffect } from "react";
import { useMovies } from "../Contexts/MoviesProvider";

export default function Main() {

    const { searchInput, setSearchInput, searched, setSearched,
        flags, tvSeries, setTvSeries, movies, setMovies
    } = useMovies()



    console.log(flags);


    function getSearchedItems() {

        setSearched([...movies, ...tvSeries])
    }

    function voteToStar(maxNumber) {
        const vote = Math.ceil(maxNumber / 2)
        let stars = ''
        for (let i = 0; i <= vote; i++) {
            stars += '⭐'
        }
        return stars
    }

    useEffect(getSearchedItems, [movies, tvSeries])

    return (
        <main>
            <div className="container">

                <div className="row">
                    {searched.map(movie => {

                        return (
                            <div key={movie.id} className="col-3">
                                <div className="card">
                                    <div className="img-container">
                                        <img className="card-img" src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="movie-img" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title || movie.name}</h5>
                                        <h6 className="card-title">{movie.original_title || movie.original_name}</h6>
                                        {flags[movie.original_language] ?
                                            <img className="language-ico" src={flags[movie.original_language]} alt="" /> :
                                            <p className="card-text language-txt">{movie.original_language}</p>
                                        }
                                        <p className="card-text stars">
                                            {voteToStar(movie.vote_average)}
                                        </p>
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