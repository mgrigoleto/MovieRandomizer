import { useRef, useEffect, useState } from "react"
import { fetchGenres, fetchMovieById, fetchRandomMovieList, imageUrl } from "../api/movies"
import { OrbitProgress } from "react-loading-indicators"
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import PixelGameTip from "../components/PixelGameTip";
import { FaSquare } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll"

import "./PixelGame.css"
import SearchSelect from "../components/SearchSelect";

const PixelGame = () => {
    const [genres, setGenres] = useState([])
    const [movie, setMovie] = useState(null)
    const [guessesAmount, setGuessesAmount] = useState(0)
    const [wonGame, setWonGame] = useState(null)
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [inputErrorMsg, setInputErrorMsg] = useState('')
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [attempts, setAttempts] = useState([])
    const [posterUrl, setPosterUrl] = useState('/pixel-game-template.png')

    const timerRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        try {
            fetchGenres().then(data => {
                setGenres(data)
            })
        } catch (err) {
            console.error(err)
        }
    }, [])

    const selectGenres = (id = null, selectAll = false, unselectAll = false) => {
        if (id) {
            let updatedGenres = [...genres]
            let updatedGenre = updatedGenres[genres.findIndex(g => g.id === id)]
            updatedGenre.selected = !updatedGenre.selected
            setGenres(updatedGenres)
            return
        }
        if (selectAll) {
            let updatedGenres = [...genres]
            for (let genre of updatedGenres) genre.selected = true
            setGenres(updatedGenres)
            return
        }
        if (unselectAll) {
            let updatedGenres = [...genres]
            for (let genre of updatedGenres) genre.selected = false
            setGenres(updatedGenres)
            return
        }
    }

    const startGame = async () => {
        setSelectedMovie(null)
        setGuessesAmount(0)
        setWonGame(null)
        setAttempts([])
        setPosterUrl('/pixel-game-template.png')
        try {
            fetchRandomMovieList(genres).then(data => {
                if (data.length > 0) {
                    try {
                        fetchMovieById(
                            data[Math.floor(Math.random() * data.length)].id
                        ).then(movie => {
                            console.log(movie)
                            setMovie(movie)
                            setPosterUrl(`${imageUrl}${movie.poster_path}`)

                            // Scroll the screen to show the game
                            if (buttonRef.current) {
                                scroll.scrollTo(buttonRef.current.offsetTop, {
                                    duration: 1000,
                                    smooth: "easeInOutQuart"
                                })
                            }
                        })
                    } catch (err) {
                        console.log(err)
                    }
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const guessMovie = async () => {
        if (wonGame) return

        if (!selectedMovie) {
            setInputErrorMsg('Select a movie.')
            setWrongAnswer(true)
            removeErrorMessage()
            return
        }

        if (attempts.find(m => m.id === selectedMovie.id)) {
            setInputErrorMsg("You've already guessed this movie.")
            setWrongAnswer(true)
            removeErrorMessage()
            return
        }

        if (selectedMovie?.id === movie.id) {
            setWonGame(true)
        } else if (!(selectedMovie?.id === movie.id)) {
            setGuessesAmount(guessesAmount + 1)
            setInputErrorMsg('Wrong.')
            setWrongAnswer(true)
            removeErrorMessage()

            if (guessesAmount > 7) {
                setWrongAnswer(false)
                setWonGame(false)
                return
            }
        }

        await checkIfIsInCollection(selectedMovie)
    }

    const removeErrorMessage = () => {

        if (timerRef.current) clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            setWrongAnswer(false);
            timerRef.current = null;
        }, 1500)

    }

    const checkIfIsInCollection = async (a) => {
        if (!wonGame) {
            try {
                fetchMovieById(a.id).then(m => {
                    if (movie.id === a.id) {
                        a.background = 'linear-gradient(90deg, rgb(0, 175, 0)  0%, rgba(0, 0, 0, 1) 100%)'
                    }
                    else if (movie.belongs_to_collection?.id === m.belongs_to_collection?.id) {
                        a.background = 'linear-gradient(90deg, rgba(255, 187, 0, 1)  0%, rgba(0, 0, 0, 1) 100%)'
                    }
                    else {
                        a.background = 'linear-gradient(90deg, rgba(255, 0, 0, 1)  0%, rgba(0, 0, 0, 1) 100%)'
                    }
                    setAttempts((prev) => prev.concat(selectedMovie))
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="pixel-game-container container">
            <h2>Selected Genres</h2>
            <div id="selection-line">
                <button onClick={() => selectGenres(null, true, null)} className="selected-genre-box">Select All</button>
                <button onClick={() => selectGenres(null, null, true)} className="unselected-genre-box selected-genre-box">Unselect All</button>
            </div>
            <div id="genres-container">
                {genres.length === 0 && <OrbitProgress size="medium" color="#0059FF" />}
                {genres.map(genre => (
                    <div key={genre.id} className={`${!genre.selected ? 'unselected-genre-box' : ''} selected-genre-box`} onClick={() => selectGenres(genre.id)} title={`${genre.selected ? 'Remove' : 'Add'}`}>
                        {genre.selected ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}{genre.name}
                    </div>
                ))}
            </div>
            <button ref={buttonRef} id="start-pixel-game-button" onClick={async () => await startGame()}>Start Game</button>
            {movie && (
                <div id="pixel-game-container">
                    <div id="movie-poster-container">
                        <div id="poster-wrapper">
                            <img
                                src={posterUrl}
                                className="blured-img"
                                style={{ filter: wonGame == true ? 'none' : `blur(${Math.max(0, 25 - 2.7 * guessesAmount)}px)` }}
                            />
                            {wonGame === true && (<div id="game-result-win">
                                <p>Congrats, you won!</p>
                                <p>Answer: {movie.title}</p>
                            </div>)}
                            {wonGame === false && (<div id="game-result-lose">
                                <p>You lost.</p>
                                <p>Answer: {movie.title}</p>
                            </div>)}
                            {wrongAnswer === true && (<div id="game-result-lose">
                                <p>{inputErrorMsg}</p>
                            </div>)}
                        </div>
                        <SearchSelect onSelect={setSelectedMovie} />
                        <button className="guess-button selected-genre-box " onClick={async () => await guessMovie()}>Guess</button>
                    </div>
                    <div id="movie-attempts-container">
                        <div>
                            <h3>Attempts: ({guessesAmount}/9)</h3>
                            <label id="attempts-subtitles">
                                <span id="wrong-answer">
                                    <FaSquare />
                                    WRONG
                                </span>
                                <span id="close-answer">
                                    <FaSquare />
                                    SAME COLLECTION
                                </span>
                            </label>
                        </div>
                        {attempts.map(a => (
                            <p key={a.id} className="attempt-card" style={{ background: a.background }}>{a.title} ({a.release_date?.slice(0, 4)})</p>
                        ))}
                    </div>
                    <div id="movie-tips-container">
                        <h3 style={{ padding: '0 0 16px 0' }}>Tips:</h3>
                        {guessesAmount > 0 && <PixelGameTip won={wonGame} tipType={`Release year`} text={`${movie.release_date?.slice(0, 4)}`} />}
                        {guessesAmount > 1 && <PixelGameTip won={wonGame} tipType={`Rating`} text={`${movie.vote_average?.toFixed(1)}`} />}
                        {guessesAmount > 2 && <PixelGameTip won={wonGame} tipType={`Budget`} text={`$ ${movie.budget.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`} />}
                        {guessesAmount > 3 && <PixelGameTip won={wonGame} tipType={`Revenue`} text={`$ ${movie.revenue.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`} />}
                        {guessesAmount > 4 && <PixelGameTip won={wonGame} tipType={`Genres`} text={`${movie.genres.map(genre => genre.name).join(", ")}`} />}
                        {guessesAmount > 5 && <PixelGameTip won={wonGame} tipType={`Production`} text={`${movie.production_companies.map(production => production.name).join(", ")}`} />}
                        {guessesAmount > 6 && <PixelGameTip won={wonGame} tipType={`Tagline`} text={`${movie.tagline}`} />}
                        {guessesAmount > 7 && <PixelGameTip won={wonGame} tipType={`Overview`} text={`${movie.overview}`} />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PixelGame
