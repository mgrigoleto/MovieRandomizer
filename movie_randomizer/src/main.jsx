import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import PixelGame from "./pages/PixelGame.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Movie />} />
                    <Route path="/pixelgame" element={<PixelGame />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
