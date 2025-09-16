import { Link } from "react-router-dom"

import { FaStar } from "react-icons/fa"

import "./MovieCard.css"

const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">
            <img src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p className="rating">
                <FaStar /> {movie.vote_average.toFixed(1)}
            </p>
            {showLink &&
                <Link to={`/movie/${movie.id}`}>
                    Details
                </Link>}
        </div>
    )
}

export default MovieCard
