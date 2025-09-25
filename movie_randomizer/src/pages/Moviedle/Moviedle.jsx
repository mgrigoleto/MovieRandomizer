import { useState, useEffect, useRef } from 'react'
import { RiRefreshLine } from "react-icons/ri";
import { OrbitProgress } from "react-loading-indicators"
import SearchSelect from '../../components/SearchSelect/SearchSelect';
import { fetchMovieById, fetchRandomMovieList, imageUrl } from '../../api/movies';

import './Moviedle.css'
import MovidleAttempt from '../../components/MovidleAttempt/MovidleAttempt';

const Moviedle = () => {
    const [movie, setMovie] = useState(null)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [attempts, setAttempts] = useState([])
    const [wonGame, setWonGame] = useState(null)
    const [posterUrl, setPosterUrl] = useState('/pixel-game-template.png')
    const [loading, setLoading] = useState(true)
    const [bestScore, setBestScore] = useState(0)

    const attemptsRef = useRef(null)


    const startGame = () => {
        setLoading(true)
        setWonGame(false)
        setAttempts([])
        setPosterUrl(`/pixel-game-template.png`)
        try {
            fetchRandomMovieList().then(movies => {
                if (movies.length > 0) {
                    try {
                        fetchMovieById(movies[Math.floor(Math.random() * movies.length)].id)
                            .then(movie => {
                                setMovie(movie)
                                setLoading(false)
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
        if (wonGame || !selectedMovie) return

        fetchMovieById(selectedMovie?.id).then((m) => {
            setAttempts((prev) => [...prev, m])
        })

        if (selectedMovie?.id === movie?.id) {
            setWonGame(true)
            setPosterUrl(`${imageUrl}${movie.poster_path}`)
        }
    }

    useEffect(() => {
        startGame()
    }, [])

    useEffect(() => {
        if (attemptsRef.current) {
            attemptsRef.current.scrollTo({
                top: attemptsRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [attempts])

    return (
        <div className='moviedle-container container'>
            <label id="moviedle-title">
                <h2>Moviedle</h2>
                <button onClick={() => startGame()} title='Repick movie'><RiRefreshLine /></button>
            </label>
            <p id="moviedle-subtitle">Moviedle is <b>not daily</b>. You can <b>play again</b> or <b>pick another movie</b> by hiting the refresh button above.</p>
            <div id="guess-container">
                <div id='poster-container'>
                    <img src={posterUrl} />
                </div>
                <div id='input-guess-container'>
                    <SearchSelect onSelect={setSelectedMovie} />
                    <button className={`${wonGame ? 'win-guess-button' : ''} guess-button`} onClick={async () => await guessMovie()} disabled={loading}>
                        {loading && <span className='small-loading'><OrbitProgress size="small" color="#ffffffff" /></span>}  {!wonGame && !loading ? 'Guess' : !loading ? 'You won!' : ''}
                    </button>
                </div>
            </div>
            <table id="similarities-header">
                <tbody>
                    <tr>
                        <th style={{ minWidth: '30px' }}>#</th>
                        <th className='small-moviedle-table-column'>Year</th>
                        <th className='medium-moviedle-table-column'>Title</th>
                        <th className='medium-moviedle-table-column'>Collection</th>
                        <th className='large-moviedle-table-column'>Production</th>
                        <th className='small-moviedle-table-column'>Original language</th>
                        <th className='medium-moviedle-table-column'>Genres</th>
                        <th className='small-moviedle-table-column'>Rating</th>
                    </tr>
                </tbody>
            </table>
            <div id="attempts-container" ref={attemptsRef}>
                <table id="attempts-table">
                    <tbody>
                        {attempts.map((att, index) => (
                            <MovidleAttempt
                                movie={movie}
                                attempt={att}
                                attemptNumber={index + 1}
                                isLast={attempts.length == index + 1}
                                key={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Moviedle
