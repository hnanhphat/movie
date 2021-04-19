import { React, useState } from 'react';
import noImg from '../no-img.jpg';
import MovieDetail from './MovieDetail';

const MovieCard = ({ movie }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div>
      <div className="movie-card">
        <button className="movie-card__box" onClick={() => setShowDetail(true)}>
          <div className="movie-card__poster" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : noImg}')`}}></div>
          <div className="movie-card__info">
            <h2 className="title">{movie.title ? movie.title : movie.original_name ? movie.original_name : 'Unknown'}</h2>
          </div>
        </button>
      </div>
      <MovieDetail selectedMovie={movie} showPopup={showDetail} setShowPopup={setShowDetail} />
    </div>
  )
}

export default MovieCard
