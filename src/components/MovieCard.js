import React from 'react';
import noImg from '../no-img.jpg';

const MovieCard = ({ movie, showDetail }) => {
  return (
    <div className="movie-card">
      <button className="movie-card__box" onClick={() => showDetail(movie)}>
        <div className="movie-card__poster" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : noImg}')`}}></div>
        <div className="movie-card__info">
          <h2 className="title">{movie.title ? movie.title : 'Unknown'}</h2>
        </div>
      </button>
    </div>
  )
}

export default MovieCard
