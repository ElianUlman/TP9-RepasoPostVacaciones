import { useState, useEffect } from 'react'
import './App.css'
import Header from "./layout/Header.jsx"
import Searchbar from "./components/Searchbar.jsx"
import { simpleMovie, movieDetail, filterSeacrh } from './services/axios.js'
import ItemList from './components/ItemList.jsx'
import PopUpDetalle from './components/PopUpDetalle.jsx'

function App() {
  const theme = "light";
  const toggleTheme = () => {};
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [buscado, setBuscado] = useState(false)

  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem('favoritos')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    handleSearch("batman", null, false)
  }, [])

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const handleSearch = async (busqueda, filter = null, guardarHistorial = true) => {
    let res
    setMovie()
    setError(null)
    setLoading(true)
    setBuscado(true)

    try {
      if (filter) {
        res = await filterSeacrh(busqueda, filter)
      } else {
        res = await simpleMovie(busqueda)
      }
      setMovies(res.Search)
    } catch (err) {
      setError("No fue posible obtener la información.")
      setMovies([])
    } finally {
      setLoading(false)
    }

    if (guardarHistorial) {
      let history

      if (sessionStorage.getItem('history')) {
        history = JSON.parse(sessionStorage.getItem('history'))
      } else {
        history = []
      }
      history.push({ name: busqueda })

      sessionStorage.setItem('history', JSON.stringify(history))
    }
  }

  const mostrarPelicula = async (id) => {
    setError(null)
    setLoading(true)
    try {
      const res = await movieDetail(id)
      setMovie(res)
      setMovies([])
    } catch (err) {
      setError("No fue posible obtener la información.")
    } finally {
      setLoading(false)
    }
  }

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

  const home = () => {
    setMovie(null);
    setMovies([]);
    setError(null);
    setBuscado(false);
    sessionStorage.removeItem('history');
  };

  return (
    <div className={theme} style={{ minHeight: "100vh" }}>
      <Header />
      <Searchbar handleSearch={handleSearch} home={home} toggleTheme={toggleTheme} />

      {loading && <p className="status-message">Cargando información...</p>}

      {!loading && error && <p className="status-message error-message">{error}</p>}

      {!loading && !error && buscado && movies.length === 0 && !movie && (
        <p className="status-message">No encontramos resultados.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <ItemList
          movies={movies}
          mostrarPelicula={mostrarPelicula}
          toggleFavorito={toggleFavorito}
          esFavorito={esFavorito}
        />
      )}

      {!loading && movie && <PopUpDetalle movie={movie} />}

      {favoritos.length > 0 && (
        <section className="favorites-section">
          <h2 className="favorites-title">⭐ Favoritos</h2>
          <ItemList
            movies={favoritos}
            mostrarPelicula={mostrarPelicula}
            toggleFavorito={toggleFavorito}
            esFavorito={esFavorito}
          />
        </section>
      )}
    </div>
  )
}

export default App