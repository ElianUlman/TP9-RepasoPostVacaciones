import "./ItemCard.css"

function ItemCard({ pelicula, mostrarPelicula }) {

    const handleClick = () => {
        mostrarPelicula(pelicula.imdbID)
    }

    return (
        <section className="movie-card">
            <img src={pelicula.Poster} alt="Poster" onClick={handleClick} className="movie-card-poster" />
            <p className="movie-card-title">{pelicula.Title}</p>
            <p className="movie-card-year">{pelicula.Year}</p>
            <p className="movie-card-type">{pelicula.Type}</p>
        </section>
    )
}

export default ItemCard