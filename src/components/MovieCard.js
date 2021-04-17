import React from 'react';
import { Link } from 'react-router-dom';
import noImg from '../no-img.jpg';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/${movie.id}`}>
        {/* <div className="movie-card__poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`}}> */}
        <div className="movie-card__poster" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : noImg}')`}}>
          <h2 className="title">{movie.title}</h2>
        </div>
        <div className="movie-card__info">

        </div>
      </Link>
    </div>
  )
}

export default MovieCard
