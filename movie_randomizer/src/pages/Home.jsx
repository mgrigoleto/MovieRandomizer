import { useState, useEffect, use } from "react"
import MovieCard from "../components/MovieCard"
import { OrbitProgress } from "react-loading-indicators"

import { FaSearch } from "react-icons/fa"

import "./MovieGrid.css"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const genresURL = import.meta.env.VITE_GENRES
const searchURL = import.meta.env.VITE_SEARCH

const Home = () => {
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])
    const [sortBy, setSortBy] = useState("popular")
    const [search, setSearch] = useState("")

    const getMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setMovies(data.results)
    }

    const getGenres = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setGenres(data.genres)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return
        getSearchedMovies(`${searchURL}?${apiKey}&query=${search}`)
    }

    const getSearchedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        setMovies(data.results)
    }

    useEffect(() => {
        setMovies([])
        const moviesUrl = `${moviesURL}${sortBy}?${apiKey}`
        getMovies(moviesUrl)
    }, [sortBy])

    useEffect(() => {
        const genresUrl = `${genresURL}?${apiKey}`
        getGenres(genresUrl)
    }, [])

    return (
        <div className="container">
            <nav id="search-navbar">
                <div id="sort-options">
                    <label className={`sort-label ${sortBy === "popular" && "selected-label"}`}>
                        <input
                            type="radio"
                            name="sort"
                            value="popular"
                            checked={sortBy === "popular"}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-input"
                        />
                        <span className="sort-span">
                            Popular
                        </span>
                    </label>
                    <label className={`sort-label ${sortBy === "now_playing" && "selected-label"}`}>
                        <input
                            type="radio"
                            name="sort"
                            value="now_playing"
                            checked={sortBy === "now_playing"}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-input"
                        />
                        <span className="sort-span">
                            Now Playing
                        </span>
                    </label>
                    <label className={`sort-label ${sortBy === "top_rated" && "selected-label"}`}>
                        <input
                            type="radio"
                            name="sort"
                            value="top_rated"
                            checked={sortBy === "top_rated"}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-input"
                        />
                        <span className="sort-span">
                            Top Rated
                        </span>
                    </label>
                    <label className={`sort-label ${sortBy === "upcoming" && "selected-label"}`}>
                        <input
                            type="radio"
                            name="sort"
                            value="upcoming"
                            checked={sortBy === "upcoming"}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-input"
                        />
                        <span className="sort-span">
                            Upcoming
                        </span>
                    </label>
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search} />
                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>
            </nav>

            <div className="movies-container">
                {movies.length === 0 && <OrbitProgress size="large" color="#0059FF" />}
                {movies.length > 0 && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} genres={genres} />
                ))}
            </div>
        </div>
    )
}

export default Home
