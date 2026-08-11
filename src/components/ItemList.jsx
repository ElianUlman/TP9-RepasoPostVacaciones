import "./ItemList.css"
import ItemCard from "./ItemCard.jsx"

function ItemList({ movies, mostrarPelicula, toggleFavorito, esFavorito }) {
    return (
        <div className="movie-grid">
            {movies && movies.map((pelicula) => (
                <ItemCard
                    key={pelicula.imdbID}
                    pelicula={pelicula}
                    mostrarPelicula={mostrarPelicula}
                    toggleFavorito={toggleFavorito}
                    esFavorito={esFavorito}
                />
            ))}
        </div>
    )
}

export default ItemList