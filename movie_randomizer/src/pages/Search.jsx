import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { OrbitProgress } from "react-loading-indicators"

import "./MovieGrid.css"

const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [movies, setMovies] = useState([])

    const getSearchedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setMovies(data.results)
    }

    useEffect(() => {
        setMovies([])
        const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`
        getSearchedMovies(searchWithQueryUrl)
    }, [query])

    return (
        <div className="container">
            <h2 className="title">
                Results for "<span>{query}</span>"
            </h2>
            <div className="movies-container">
                {movies.length === 0 && <OrbitProgress size="large" color="#0059FF"/>}
                {movies.length > 0 && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Search
