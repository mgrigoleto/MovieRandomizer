import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { imageUrl } from "../api/movies"

import "./Movie.css"
import { fetchMovieById } from "../api/movies"

const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        try {
            fetchMovieById(id).then(data => setMovie(data))
        } catch (err) { 
            console.error(err)
        }
    }, [])

    return (
        <div className="movie-page">
            {movie &&
                <>
                    <h1>Work in progress...</h1>
                    <div className="container">
                        <div id="poster">
                            <h2 id="title">{movie.title}</h2>
                            <img src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div id="details">
                            <div>
                                <h3>Rating</h3>
                                <p id="rating">
                                    <FaStar /> {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                            <div>
                                <h3>Tagline</h3>
                                <p>{movie.tagline}</p>
                            </div>
                            <div>
                                <h3>Overview</h3>
                                <p>{movie.overview}</p>
                            </div>
                            <div>
                                <h3>Genres</h3>
                                <p>{movie.genres.map(genre => genre.name).join(", ")}</p>
                            </div>
                            <div>
                                <h3>Budget</h3>
                                <p>$ {movie.budget.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</p>
                            </div>
                            <div>
                                <h3>Revenue</h3>
                                <p>$ {movie.revenue.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}</p>
                            </div>
                            <div>
                                <h3>Runtime</h3>
                                <p>{movie.runtime} minutes</p>
                            </div>
                            <div>
                                <h3>Original language</h3>
                                <p>{movie.original_language}</p>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default Movie
