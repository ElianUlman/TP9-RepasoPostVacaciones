import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from "./layout/Header.jsx"
import Home from "./pages/Home.jsx"
import Favorites from "./pages/Favorites.jsx"

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem('favoritos')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const toggleFavorito = (pelicula) => {
    setFavoritos((prev) => {
      const yaExiste = prev.some((fav) => fav.imdbID === pelicula.imdbID)
      if (yaExiste) {
        return prev.filter((fav) => fav.imdbID !== pelicula.imdbID)
      }
      return [...prev, pelicula]
    })
  }

  const esFavorito = (id) => favoritos.some((fav) => fav.imdbID === id)

  return (
    <BrowserRouter>
      <div className={theme} style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}>
        <Header />
        <nav className="app-nav">
          <Link to="/">Inicio</Link>
          <Link to="/favoritos">Favoritos ({favoritos.length})</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                toggleFavorito={toggleFavorito}
                esFavorito={esFavorito}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route
            path="/favoritos"
            element={
              <Favorites
                favoritos={favoritos}
                toggleFavorito={toggleFavorito}
                esFavorito={esFavorito}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App