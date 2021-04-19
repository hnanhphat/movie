import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../apiService';
import MovieCard from './MovieCard';
import Slider from "react-slick";
import '../libraries/slick/slick.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const TvShow = ({ setCurrentState }) => {
  const [movies, setMovies] = useState(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "4vw",
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      }
    }]
  }

  useEffect(() => {
    const getMovies = async () => {
      let url = `tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await api.get(url);
      setMovies(res.data);
    }
    getMovies();
  }, []);

  return (
    <div id="movies-tv-show" className="movies movies--tv-show">
      <Link to="/tvshows" onClick={() => setCurrentState('TV Shows')} className="movies__title">TV Shows<span>Explore All</span></Link>
      <Slider {...settings}>
        {movies && movies.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </div>
  )
}

export default TvShow
