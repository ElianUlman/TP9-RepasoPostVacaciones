import { FaStar, FaRegStar } from 'react-icons/fa'
import "./ItemCard.css"

function ItemCard({ pelicula, mostrarPelicula, toggleFavorito, esFavorito }) {

    const handleClick = () => {
        mostrarPelicula(pelicula.imdbID)
    }

    const handleFavClick = (e) => {
        e.stopPropagation()
        toggleFavorito(pelicula)
    }

    const favorito = esFavorito(pelicula.imdbID)

    return (
        <section className="movie-card">
            <img src={pelicula.Poster} alt="Poster" onClick={handleClick} className="movie-card-poster" />
            <p className="movie-card-title">{pelicula.Title}</p>
            <p className="movie-card-year">{pelicula.Year}</p>
            <p className="movie-card-type">{pelicula.Type}</p>
            <button 
                className="movie-card-fav-btn" 
                onClick={handleFavClick}
                aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
                {favorito ? (
                    <FaStar className="star-icon active" />
                ) : (
                    <FaRegStar className="star-icon" />
                )}
            </button>
        </section>
    )
}

export default ItemCard