import { useState, useEffect } from 'react'
import Searchbar from "../components/Searchbar.jsx"
import { simpleMovie, movieDetail, filterSeacrh } from '../services/axios.js'
import ItemList from '../components/ItemList.jsx'
import PopUpDetalle from '../components/PopUpDetalle.jsx'

function Home({ toggleFavorito, esFavorito, toggleTheme }) {
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [buscado, setBuscado] = useState(false)

  const BUSQUEDA_BASE = "avengers"

  useEffect(() => {
    handleSearch(BUSQUEDA_BASE, null, false)
  }, [])

  const handleSearch = async (busqueda, filter = null, guardarHistorial = true) => {
    let res
    setMovie(null)
    setError(null)
    setLoading(true)
    setBuscado(true)

    try {
      if (filter) {
        res = await filterSeacrh(busqueda, filter)
      } else {
        res = await simpleMovie(busqueda)
      }
      setMovies(res.Search || [])
    } catch (err) {
      setError("No fue posible obtener la información.")
      setMovies([])
    } finally {
      setLoading(false)
    }

    if (guardarHistorial) {
      let history = sessionStorage.getItem('history')
        ? JSON.parse(sessionStorage.getItem('history'))
        : []
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

  const home = () => {
    setMovie(null);
    sessionStorage.removeItem('history');
    handleSearch(BUSQUEDA_BASE, null, false);
  };

  return (
    <>
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
    </>
  )
}

export default Home