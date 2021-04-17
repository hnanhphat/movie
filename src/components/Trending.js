import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../apiService';
import MovieCard from './MovieCard';
import Slider from "react-slick";
import '../libraries/slick/slick.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const Trending = () => {
  const [movies, setMovies] = useState(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "4%",
    slidesToShow: 5,
    slidesToScroll: 1
  }

  useEffect(() => {
    const getMovies = async () => {
      let url = `trending/all/day?api_key=${API_KEY}`;
      const res = await api.get(url);
      setMovies(res.data);
    }
    getMovies();
  }, []);

  return (
    <div id="trending" className="movies movies--trending">
      <Link to="" className="movies__title">Trending<span>Explore All</span></Link>
      <Slider {...settings}>
        {movies && movies.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </div>
  )
}

export default Trending
