import { Outlet } from 'react-router-dom'
import Navbar from './components/nanana/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
 
function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default App
