import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState } from "react"
import { FaPlus, FaMinus } from "react-icons/fa"
import { OrbitProgress } from "react-loading-indicators"
import { getGradeColor } from "../../utils/getGradeColor"
import { fetchSimilarMovies } from "../../api/movies"
import { imageUrl } from "../../api/movies"

import "./MovieCard.css"

const MovieCard = ({ movie, genres = [], child = false }) => {
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    const getSimilarMovies = async (id) => {
        if (similarMovies.length > 0) {
            setSimilarMovies([])
            return
        }

        setLoading(true)
        await fetchMovies(id)
        setLoading(false)
    }


    const fetchMovies = async (id) => {
        try {
            const newMovies = await fetchSimilarMovies(id, page)
            setSimilarMovies((prev) => [...prev, ...newMovies])
            setPage((prev) => prev + 1)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="movie-container">
            <div className={`movie-card ${child ? "child-card" : ""}`}>
                <img src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
                <div className="movie-details">
                    <Link to={`/movie/${movie.id}`}><h3>{movie.title}</h3></Link>
                    <p className="genres">
                        {movie.genre_ids && genres.length > 0 ? movie.genre_ids.map(id => {
                            const genre = genres.find(g => g.id === id)
                            return genre ? genre.name : null
                        }).filter(name => name !== null).join(", ") : "No genres available"}
                    </p>
                    <span className={`rating ${getGradeColor(movie.vote_average)}`}>
                        <FaStar /> {movie.vote_average.toFixed(1)}
                    </span>
                    <p className="overview">{movie.overview}</p>
                    {!child && <button className="similar-button" onClick={() => getSimilarMovies(movie.id)}>Similar Movies {similarMovies.length > 0 ? <FaMinus /> : <FaPlus />}</button>}
                </div>
            </div>
            {similarMovies.length > 0 && <div className="similar-movies">
                {similarMovies.map(similarMovie => (
                    <MovieCard key={similarMovie.id} movie={similarMovie} genres={genres} child={true} />
                ))}
                <div id="load-more-section"><button className="load-more-button" onClick={async () => await fetchMovies(movie.id)}>More</button></div>
            </div>}
            {loading && <OrbitProgress size="large" color="#0059FF" />}
        </div>
    )
}

export default MovieCard
