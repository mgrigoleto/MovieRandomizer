import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'

import App from './App.jsx'
import Home from "./pages/Home/Home.jsx";
import Movie from "./pages/Movie/Movie.jsx";
import PixelGame from "./pages/PixelGame/PixelGame.jsx";
import Moviedle from './pages/Moviedle/Moviedle.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Movie />} />
                    <Route path="/pixelgame" element={<PixelGame />} />
                    <Route path="/moviedle" element={<Moviedle />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
