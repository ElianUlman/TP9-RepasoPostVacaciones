import { useState } from 'react'
import './App.css'
import Searchbar from "./components/Searchbar.jsx"
import { simpleMovie, movieDetail, filterSeacrh } from './services/axios.js'
import ItemCard from './components/ItemCard.jsx'
import PopUpDetalle from './components/PopUpDetalle.jsx'

function App() {
  const theme = "light";
  const toggleTheme = () => {};
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()

  const handleSearch = async (busqueda, filter = null) => {
    let res
    setMovie()

    try {
      if (filter) {
        res = await filterSeacrh(busqueda, filter)
      } else {
        res = await simpleMovie(busqueda)
      }
    } catch (error) {
      console.error(error)
      setMovies([])
      return
    }

    let history

    if (sessionStorage.getItem('history')) {
      history = JSON.parse(sessionStorage.getItem('history'))
    } else {
      history = []
    }
    history.push({ name: busqueda })

    sessionStorage.setItem('history', JSON.stringify(history))

    setMovies(res.Search)
  }

  const mostrarPelicula = async (id) => {
    try {
      const res = await movieDetail(id)
      setMovie(res)
      setMovies([])
    } catch (error) {
      console.error(error)
    }
  }

  const home = () => {
    setMovie(null);
    setMovies([]);
    sessionStorage.removeItem('history');
  };

  return (
    <div className={theme} style={{ minHeight: "100vh" }}>
      <Searchbar handleSearch={handleSearch} home={home} toggleTheme={toggleTheme} />
      <div className="movie-grid">
        {movies && movies.map((pelicula) => (
          <ItemCard key={pelicula.imdbID} pelicula={pelicula} mostrarPelicula={mostrarPelicula} />
        ))}
      </div>
      {movie && <PopUpDetalle movie={movie} />}
    </div>
  )
}

export default App