import { Link, useNavigate } from "react-router-dom"

import { BiSolidMoviePlay } from "react-icons/bi"

import "./Navbar.css"

const Navbar = () => {
    return (
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/"><BiSolidMoviePlay /> NextMovie</Link>
                </h2>
            </nav>
        </div>
    )
}

export default Navbar
