import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../apiService';
import MovieCard from './MovieCard';
import Slider from "react-slick";
import '../libraries/slick/slick.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const TopRated = () => {
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
      let url = `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await api.get(url);
      setMovies(res.data);
    }
    getMovies();
  }, []);

  return (
    <div id="top-rated" className="movies movies--top-rated">
      <Link to="/toprated" className="movies__title">Top Rated<span>Explore All</span></Link>
      <Slider {...settings}>
        {movies && movies.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </div>
  )
}

export default TopRated
