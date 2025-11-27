import { useEffect, useState } from "react";
import { useMovies } from "../Contexts/MoviesProvider";

export default function Main() {

    const { searchInput, setSearchInput, searched, setSearched,
        flags, tvSeries, setTvSeries, movies, setMovies, setId, castString, setMovieOrTV,
        setCastString, fetchFilmCast, fetchTVCast, cast, movieOrTV, fetchGenres, genres,
        genreFiltered, setGenreFiltered, selectedGenre, setselectedGenre
    } = useMovies()


    //Handle the serch by title
    function getSearchedItems() {

        setSearched([...movies, ...tvSeries])

    }


    //On form submit handle serchy by type and by genre
    function handleFilterFormSub(e) {
        e.preventDefault()


        //Movie or TV series Filter
        if (movieOrTV === 'Movie/TV filter') {
            setSearched([...movies, ...tvSeries])
        } else if (movieOrTV === 'movie') {
            setSearched(movies)

        } else if (movieOrTV === 'TV') {
            setSearched(tvSeries)
        }


        //Genre Filtering
        if (selectedGenre != 0) {
            const genreId = Number(selectedGenre)
            console.log(genreId);
            console.log(searched);

            const genreFilter = searched.filter(movie => movie.genre_ids.includes(genreId))

            console.log(genreFilter);

            setGenreFiltered(genreFilter)

        } else {
            setGenreFiltered(searched)
        }
    }

    function voteToStar(maxNumber) {
        const vote = Math.ceil(maxNumber / 2)
        let stars = []
        const maxVote = 5 - vote
        for (let i = 1; i <= vote; i++) {
            const item = <i className="bi bi-star-fill"></i>
            stars.push(item)
        }
        for (let i = 1; i <= maxVote; i++) {
            const item = <i className="bi bi-star"></i>
            stars.push(item)
        }
        return stars
    }


    function handleCastClick(id, title) {
        console.log(id);

        if (title) {
            fetchFilmCast(id)

        } else {

            fetchTVCast(id)
        }
        const string = cast.join(',')

        if (castString === '') {
            setCastString(string)
        } else {
            setCastString('')

        }

    }



    useEffect(getSearchedItems, [movies, tvSeries])
    useEffect(fetchGenres, [movieOrTV])




    return (
        <main>
            <div className="container">

                <form onSubmit={e => handleFilterFormSub(e)}>
                    <div className="select-group">
                        <select name="Movie or TV"
                            value={movieOrTV} onChange={e => setMovieOrTV(e.target.value)}
                        >
                            <option value="Movie/TV filter">Show Both</option>
                            <option value="movie">Movie</option>
                            <option value="TV">TV</option>
                        </select>
                        <select name="Genres"
                            value={selectedGenre} onChange={e => setselectedGenre(e.target.value)}
                        >
                            {console.log(genres)
                            }
                            <option value='0'> No genre selected</option>
                            {genres.map(genre => {

                                return (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <button type="submit">Filter</button>
                </form>

                <div className="row">
                    {genreFiltered.map(movie => {

                        return (
                            <div key={movie.id} className="col-3">
                                <div className="card">
                                    <div className="img-container">
                                        <img className="card-img" src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="movie-img" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title || movie.name}</h5>
                                        <h6 className="card-title">{movie.original_title || movie.original_name}</h6>
                                        <p className="description">
                                            {movie.overview}
                                        </p>
                                        {flags[movie.original_language] ?
                                            <img className="language-ico" src={flags[movie.original_language]} alt="" /> :
                                            <p className="card-text language-txt">{movie.original_language}</p>
                                        }
                                        <p className="card-text stars">
                                            {voteToStar(movie.vote_average).map(star => {
                                                return (
                                                    star
                                                )
                                            })}
                                        </p>


                                        <p className="cast">
                                            {castString}
                                        </p>
                                        <button onClick={() => handleCastClick(movie.id, movie.title)}
                                        >
                                            {castString === '' ? 'Show Cast' : 'Hide Cast'}
                                        </button>
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