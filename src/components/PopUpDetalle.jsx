import "./PopUpDetalle.css"

function PopUpDetalle({ movie }) {
  return (
    <section className="movie-detail">

      <img className="movie-detail-poster" src={movie.Poster} alt={movie.Title} />

      <div className="movie-detail-info">
        <h1 className="movie-detail-title">{movie.Title}</h1>
        <p className="movie-detail-rating">⭐ {movie.imdbRating}</p>
        <div className="movie-detail-meta">
          {movie.Genre?.split(",").map((g) => (
            <span className="movie-detail-tag" key={g}>{g.trim()}</span>
          ))}
          <span className="movie-detail-tag">{movie.Runtime}</span>
          <span className="movie-detail-tag">{movie.Released}</span>
        </div>
        <p className="movie-detail-plot">{movie.Plot}</p>
        <p className="detail-row"><span>Director:</span> {movie.Director}</p>
        <p className="detail-row"><span>Actores:</span> {movie.Actors}</p>
        <p className="detail-row"><span>País:</span> {movie.Country}</p>
        <p className="detail-row"><span>Idioma:</span> {movie.Language}</p>
      </div>

    </section>
  )
}

export default PopUpDetalle