import { Link } from "react-router-dom"

import { FaStar } from "react-icons/fa"

import "./MovieCard.css"

const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({ movie, genres = [] }) => {
    
    const getGradeColor = (vote) => {
        if (vote >= 8) {
            return "excellent"
        } else if (vote >= 6.5) {
            return "good"
        } else if (vote >= 4.5) {
            return "average"
        } else if (vote >= 2.5) {
            return "bad"
        } else {
            return "terrible"
        }
    }

    return (
        <div className="movie-card">
            <img src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
            <div className="movie-details">
                <h3>{movie.title}</h3>
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
            </div>
        </div>
    )
}

export default MovieCard
