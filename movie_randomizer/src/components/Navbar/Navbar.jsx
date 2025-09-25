import { Link } from "react-router-dom"

import { BiSolidMoviePlay } from "react-icons/bi"

import "./Navbar.css"

const Navbar = () => {
    return (
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/"><BiSolidMoviePlay /> NextMovie</Link>
                </h2>
                <nav id="games-nav">
                    <Link to="/pixelgame"><h3>Pixel Game</h3></Link>
                    <Link to="/moviedle"><h3>Moviedle</h3></Link>
                </nav>
            </nav>
        </div>
    )
}

export default Navbar
