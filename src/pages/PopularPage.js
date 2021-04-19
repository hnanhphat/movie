import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../apiService';
import noImg from '../no-img.jpg';
import Slider from "react-slick";
import '../libraries/slick/slick.css';
import PaginationBar from '../components/PaginationBar';
import Loading from '../components/Loading';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const PopularPage = () => {
  const [movies, setMovies] = useState(null);
  const [moviesFilter, setMoviesFilter] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [yearRange, setYearRange] = useState({min: 1900, max: 2021});
  const [rating, setRating] = useState({min: 0, max: 10});

  const settings = {
    autoplay: true,
    arrows: false,
    dots: true,
    speed: 3000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  useEffect(() => {
    const getMovies = async () => {
      setLoading(false);
      let url = `movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      const res = await api.get(url);
      setMovies(res.data);
      setTotalPage(res.data.total_pages);
      setLoading(true);
    }
    getMovies();
  }, [currentPage, totalPage]);

  useEffect(() => {
    const getFilterMovies = () => {
      let filterMovies = movies;
      filterMovies = movies && movies.results.filter(movie =>
        parseInt(movie.release_date.slice(0, 4)) >= yearRange.min &&
        parseInt(movie.release_date.slice(0, 4)) <= yearRange.max &&
        movie.vote_average >= rating.min &&
        movie.vote_average <= rating.max);
      setMoviesFilter(filterMovies);
    }
    getFilterMovies();
  }, [movies, yearRange, rating])

  return (
    <div id="tvshow" className="archive archive--tvshow">
      {loading ?
        <div>
          <div className="archive__first-view">
            <Slider {...settings}>
              {movies && movies.results.map((movie, i) => i < 5 ? <div className="item" key={movie.id}><div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : noImg}')`}}></div></div> : '')}
            </Slider>
          </div>
          <div className="archive__title">
            <h2>New &amp; Popular</h2>
            <div className="filter">
              <div className="filter__icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" className="svg-inline--fa fa-sliders-h fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"></path></svg></div>
              <div className="filter__dropdown">
                <div className="item">
                  <h3>Year:</h3>
                  <InputRange
                    maxValue={2021}
                    minValue={1900}
                    value={yearRange}
                    onChange={value => setYearRange(value)}
                  />
                </div>
                <div className="item">
                  <h3>Rating:</h3>
                  <InputRange
                    maxValue={10}
                    minValue={0}
                    value={rating}
                    onChange={value => setRating(value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <ul className="archive__list">
            {moviesFilter && moviesFilter.map(movie =>
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noImg}')`}}></div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      : <Loading />}
      {totalPage > 1 ? <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} /> : ''}
    </div>
  )
}

export default PopularPage
