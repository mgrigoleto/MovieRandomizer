export const getRandomAntiCheatMessage = () => {
    const messages = [
        "Nuh uh. No peaking.",
        "Not today.",
        "Oops... Seems like you can't open the image on a new tab ;)",
        "Oh noooo. Seems like you can't check this picture.",
        "Nope. You'll gotta check the files if you wanna cheat :) (loser)",
        "Bro, who tf cheats on a guessing game?",
        "Stop clicking me.",
        "☝️🤓 Acshually, you are not supposed to open it on a new tab.",
        "The awesome dev who coded this thought about you tryna open the image.",
        "Just look at the html code atp. Imagine cheating on a guessing game.",
        "STOP.",
        "Wow! You just won a million kwanzas!!! Jk, I'm just blocking your clicks.",
        "Oops. I just ate your click 😇",
        "You won't be able to open this on a new tab. Give up (or check the files).",
        "You are supposed to guess it.",
        "Oh, look at me, I'm a blured movie poster!",
        "There is a 0.69696969% of you getting this message (totally real)",
        "Peekaboo! Found ya.",
        "You should listen to Slipknot, they are really good.",
        "It's definitely not 'The Black Widow', that movie is terrible.",
        "The answer is 'Scary Movie', trust 🙏"
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}