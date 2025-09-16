import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { BiSolidMoviePlay } from "react-icons/bi"
import { FaSearch } from "react-icons/fa"

import "./Navbar.css"

const Navbar = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return
        navigate(`/search?q=${search}`)
    }

    return (
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/"><BiSolidMoviePlay /> Movie Randomizer</Link>
                </h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} value={search} />
                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>
            </nav>
        </div>
    )
}

export default Navbar
