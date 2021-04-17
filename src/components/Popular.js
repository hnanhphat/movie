import { React, useState, useEffect } from 'react';
import api from '../apiService';
import MovieCard from './MovieCard';
import Slider from "react-slick";
import '../libraries/slick/slick.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const Popular = () => {
  const [movies, setMovies] = useState(null);

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1
  }

  useEffect(() => {
    const getMovies = async () => {
      let url = `movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await api.get(url);
      setMovies(res.data);
    }
    getMovies();
  }, []);

  return (
    <div id="movies-popular" className="movies movies--popular">
      <h1 className="movies__title">Popular</h1>
      <Slider {...settings}>
        {movies && movies.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </Slider>
    </div>
  )
}

export default Popular
