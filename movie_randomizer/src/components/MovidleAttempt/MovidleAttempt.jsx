import { useState } from 'react'

import './MoviedleAttempt.css'

const MovidleAttempt = ({ movie, attempt, attemptNumber = 1, isLast = true }) => {
    const year = attempt?.release_date?.slice(0, 4) ?? 'No info'
    const title = attempt?.title
    const collection = attempt?.belongs_to_collection?.name ?? 'No collection'
    const production = attempt?.production_companies?.map(c => c.name).join(', ')
    const language = attempt?.original_language
    const genres = attempt?.genres?.map(g => g.name).join(', ')
    const rating = attempt?.vote_average?.toFixed(1)

    const checkYear = () => {
        if (movie?.release_date?.slice(0, 4) === attempt?.release_date?.slice(0, 4)) {
            return 'right-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkTitle = () => {
        if (movie?.title === attempt?.title) {
            return 'right-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkRating = () => {
        if (movie?.vote_average?.toFixed(1) === attempt?.vote_average?.toFixed(1)) {
            return 'right-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkCollection = () => {
        if (movie?.belongs_to_collection?.id === attempt?.belongs_to_collection?.id) {
            return 'right-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkProduction = () => {
        if (movie?.production_companies?.map(c => c.name).join(', ') === production) {
            return 'right-movidle-guess'
        } else if (movie?.production_companies?.some(mc =>
            attempt?.production_companies?.some(ac => ac.name === mc.name))) {
            return 'close-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkLanguage = () => {
        if (movie?.original_language === attempt?.original_language) {
            return 'right-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const checkGenre = () => {
        if (movie?.genres?.map(c => c.name).join(', ') === genres) {
            return 'right-movidle-guess'
        } else if (movie?.genres?.some(mg =>
            attempt?.genres?.some(ag => ag.id === mg.id))) {
            return 'close-movidle-guess'
        } else {
            return 'wrong-movidle-guess'
        }
    }

    const getHigherOrLower = (dataType) => {
        if (dataType === 'year') {
            const movieYear = movie?.release_date?.slice(0, 4)

            if (parseFloat(movieYear) < parseFloat(year)) {
                return '(↓)'
            } else if (parseFloat(movieYear) > parseFloat(year)) {
                return '(↑)'
            } else {
                return ''
            }

        } else if (dataType === 'rating') {
            const movieRating = movie?.vote_average?.toFixed(1)

            if (parseFloat(movieRating) < parseFloat(rating)) {
                return '(↓)'
            } else if (parseFloat(movieRating) > parseFloat(rating)) {
                return '(↑)'
            } else {
                return ''
            }

        }
    }

    return (
        <tr className={`${isLast ? 'last-attempt-row' : ''} attempt-row`}>
            <td style={{ minWidth: '30px', opacity: 1 }}>{attemptNumber}</td>
            <td className={checkYear() + ' small-moviedle-table-column'} style={{ animation: 'fadeIn 0.3s ease-in-out forwards' }}><span>{year} {getHigherOrLower('year')}</span></td>
            <td className={checkTitle() + ' medium-moviedle-table-column'} style={{ animation: 'fadeIn 0.6s ease-in-out forwards' }}><span>{title}</span></td>
            <td className={checkCollection() + ' medium-moviedle-table-column'} style={{ animation: 'fadeIn 0.9s ease-in-out forwards' }}><span>{collection}</span></td>
            <td className={checkProduction() + ' large-moviedle-table-column'} style={{ animation: 'fadeIn 1.2s ease-in-out forwards' }}><span>{production}</span></td>
            <td className={checkLanguage() + ' small-moviedle-table-column'} style={{ animation: 'fadeIn 1.5s ease-in-out forwards' }}><span>{language}</span></td>
            <td className={checkGenre() + ' medium-moviedle-table-column'} style={{ animation: 'fadeIn 1.8s ease-in-out forwards' }}><span>{genres}</span></td>
            <td className={checkRating() + ' small-moviedle-table-column'} style={{ animation: 'fadeIn 2.1s ease-in-out forwards' }}><span>{rating} {getHigherOrLower('rating')}</span></td>
        </tr>
    )
}

export default MovidleAttempt
