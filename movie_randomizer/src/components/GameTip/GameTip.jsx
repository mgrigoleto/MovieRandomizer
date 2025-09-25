import { useState } from 'react'
import { FaEye } from "react-icons/fa";

import './GameTip.css'

const GameTip = ({ tipType = '', text = '', won = null }) => {
    const [showTip, setShowTip] = useState(false)

    return (
        <div className={`${won === true ? 'won-pixel-game' : won && won === false ? 'lost-pixel-game' : ''} tip-container`}>
            <button className={`${won === true ? 'won-pixel-game-button' : won && won === false ? 'lost-pixel-game-button' : ''} ${showTip ? 'show-tip-button-disabled' : ''} show-tip-button`} onClick={() => setShowTip(!showTip)} disabled={showTip ?? false}><FaEye /></button>
            <div className={`${!showTip ? 'blured-tip' : ''} pixel-game-tip`}>
                <h3>{tipType}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default GameTip
