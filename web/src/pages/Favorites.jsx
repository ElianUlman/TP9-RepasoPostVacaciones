import ItemList from '../components/ItemList.jsx'
import './Favorites.css'

function Favorites({ favoritos, toggleFavorito, esFavorito }) {
  return (
    <section className="favorites-page">
      <h2 className="favorites-title">Mis Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className="status-message">Todavía no agregaste ninguna película a favoritos.</p>
      ) : (
        <ItemList
          movies={favoritos}
          mostrarPelicula={() => {}}
          toggleFavorito={toggleFavorito}
          esFavorito={esFavorito}
        />
      )}
    </section>
  )
}

export default Favorites