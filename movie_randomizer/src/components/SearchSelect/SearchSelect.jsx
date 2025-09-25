import { useState, useEffect, useRef } from "react"
import { fetchSearchedMovies } from "../../api/movies"

import './SearchSelect.css'

const SearchSelect = ({ onSelect }) => {
    const [query, setQuery] = useState('')
    const [options, setOptions] = useState([])
    const [debouncedQuery, setDebouncedQuery] = useState(query)
    const [selected, setSelected] = useState(false)

    const containerRef = useRef(null)

    const handleOptionClick = (item) => {
        onSelect(item)
        setQuery(`${item.title} (${item.release_date.slice(0, 4)})`)
        setOptions([])
        setSelected(true)
    }

    const handleInputClick = () => {
        onSelect(null)
        setSelected(false)
        setQuery('')
    }

    // debounce to avoid fetching the api everytime the user types
    useEffect(() => {
        if (selected) return
        const timer = setTimeout(() => setDebouncedQuery(query), 150)
        return () => clearTimeout(timer)
    }, [query])

    // fetch at every debounce
    useEffect(() => {
        if (!debouncedQuery) {
            setOptions([])
            return
        }

        const fetchOptions = async () => {
            try {
                fetchSearchedMovies(debouncedQuery).then(data => {
                    setOptions(data)
                })
            } catch (err) {
                console.error(err)
            }
        }

        fetchOptions()
    }, [debouncedQuery])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOptions([])
                setSelected(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="search-select" ref={containerRef}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClick={() => handleInputClick()}
                placeholder="Type to search..."
            />
            {options.length > 0 && (
                <ul className="options">
                    {options.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => handleOptionClick(item)}
                        >
                            {`${item.title} (${item.release_date?.slice(0, 4)})`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchSelect
