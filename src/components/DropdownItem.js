import React from 'react';
import noImg from '../no-img.jpg';

const DropdownItem = ({ movie }) => {
  return (
    <div className="dropdown__item">
      <div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : noImg}')`}}></div>
      <div className="info">
        <p className="title">{movie.title}</p>
        <p className="time">{movie.release_date}</p>
      </div>
    </div>
  )
}

export default DropdownItem
