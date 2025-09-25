import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";

import './Footer.css'

const Footer = () => {

    const version = '0.2.0'

    const socials = [
        {
            id: 1,
            icon: <FaGithub />,
            name: 'Check my Github',
            url: 'https://github.com/mgrigoleto'
        },
        {
            id: 2,
            icon: <FaLinkedinIn />,
            name: 'Follow me on Linkedin',
            url: 'https://www.linkedin.com/in/maurício-grigoleto-794366228'
        },
        {
            id: 3,
            icon: <FaDiscord />,
            name: 'DM me on Discord',
            url: 'https://discordapp.com/users/380531576229986314'
        },
    ]

    return (
        <footer id="footer">
            {socials.map(s => (
                <a key={s.id} className="socials-footer" href={s.url} target="_blank">
                    <p>{s.icon} {s.name}</p>
                </a>
            ))}
            <p>v{version}</p>
        </footer>
    )
}

export default Footer
