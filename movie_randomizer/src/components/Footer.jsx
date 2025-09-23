import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";

import './Footer.css'

const Footer = () => {

    const socials = [
        {
            icon: <FaGithub />,
            name: 'Check my Github',
            url: 'https://github.com/mgrigoleto'
        },
        {
            icon: <FaLinkedinIn />,
            name: 'Follow me on Linkedin',
            url: 'https://www.linkedin.com/in/maurício-grigoleto-794366228'
        },
        {
            icon: <FaDiscord />,
            name: 'DM me on Discord',
            url: 'https://discordapp.com/users/380531576229986314'
        },
    ]

    return (
        <footer id="footer">
            {socials.map(s => (
                <a className="socials-footer" href={s.url} target="_blank">
                    <p>{s.icon} {s.name}</p>
                </a>
            ))}
        </footer>
    )
}

export default Footer
