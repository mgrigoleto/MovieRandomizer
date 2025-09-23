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
                    <h3>
                        <Link to="/pixelgame">Pixel Game</Link>
                    </h3>
                </nav>
            </nav>
        </div>
    )
}

export default Navbar
