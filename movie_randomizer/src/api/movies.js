const apiUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const moviesURL = `${apiUrl}movie`
const genresURL = `${apiUrl}genre/movie/list`
const searchURL = `${apiUrl}search/movie`
const discoverURL = `${apiUrl}discover/movie`
export const imageUrl = import.meta.env.VITE_IMG

// Look for similar movies based on a movie ID
export const fetchSimilarMovies = async (id, page = 1) => {
    const url = `${moviesURL}/${id}/similar?${apiKey}&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch similar movies")
    const data = await res.json()
    return data.results
}

// Get all movies by sort
export const fetchMoviesBySort = async (sortBy, page = 1) => {
    const url = `${moviesURL}/${sortBy}?${apiKey}&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch movies")
    const data = await res.json()
    return data.results
}

// Get all genres
export const fetchGenres = async () => {
    const url = `${genresURL}?${apiKey}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch genres")
    const data = await res.json()
    for (let genre of data.genres) genre.selected = true
    return data.genres
}

// Search for movies by a query
export const fetchSearchedMovies = async (query, page = 1) => {
    const url = `${searchURL}?${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch searched movies")
    const data = await res.json()
    return data.results
}

// Get movie info by ID
export const fetchMovieById = async (id) => {
    const url = `${moviesURL}/${id}?${apiKey}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch movie details")
    const data = await res.json()
    return data
}

// Get random list of movies
export const fetchRandomMovieList = async (genres = []) => {
    let movieList = []

    // Genres chosen by user or fetch all genres if none selected
    const possibleGenres =
        genres.length > 0 ?
            genres.filter(g => g.selected).map(g => g.id).join('|') :
            await fetchGenres().then(data => data.map(g => g.id).join("|"))

    // Possible sorts for the base request
    const possibleSorts = ["popularity.desc", "vote_count.desc", "revenue.desc"]

    // Possible pages to choose from
    const possiblePages = [1, 2, 3]

    // Every page has 20 movies
    for (let i = 0; i < 3; i++) {
        const randomSort = possibleSorts[Math.floor(Math.random() * possibleSorts.length)]
        const page = possiblePages[Math.floor(Math.random() * possiblePages.length)]

        const url = `${discoverURL}?${apiKey}&with_genres=${possibleGenres}&sort_by=${randomSort}&page=${page}`
        const res = await fetch(url)
        if (!res.ok) throw new Error("Failed to fetch random movie list")
        const data = await res.json()
        movieList = movieList.concat(data.results)

        // Ensure we don't fetch the same page again
        possiblePages.splice(possiblePages.indexOf(page), 1)
    }

    // Remove duplicates
    movieList = movieList.filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
    )

    return movieList
}
