import { React, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import api from '../apiService';
import apiJson from '../apiServiceJson';
import noImg from '../no-img.jpg';
import { toast } from 'react-toastify';
import MovieDetail from '../components/MovieDetail';

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const addToFavorites = async (e) => {
    try {
      const fav = await apiJson.get('/favorites');
      const existed = fav.data ? fav.data.find(movie => movie.id === e) : false;
      if(existed === undefined) {
        toast.error(`This movie is existed`);
      } else {
        const res = await apiJson.post('/favorites', movies);
        toast.success(`${res.data.title} added to Favorites`);
      }
    } catch (error) {}
  }

  useEffect(() => {
    const fetchData = async () => {
      let url = `movie/${id}?api_key=${API_KEY}&language=en-US`;
      const res = await api.get(url);
      setMovies(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div id="movie-detail" className="movie-detail">
      <div className="movie-detail__bg" style={{backgroundImage: `url('${movies && movies.backdrop_path ? `https://image.tmdb.org/t/p/original${movies.backdrop_path}` : noImg}')`}}></div>
      <div className="movie-detail__container">
        <div className="poster">
          <img src={`${movies && movies.poster_path ? `https://image.tmdb.org/t/p/original/${movies.poster_path}` : noImg}`} alt={movies && movies.title ? movies.title : 'Unknown'}/>
        </div>
        <div className="info">
          <h2 className="name">{movies && movies.title ? movies.title : 'Unknown'}</h2>
          <p className="match">
            {movies && movies.vote_average ? <span className="match__vote">{movies.vote_average.toString().replace('.', '')}% Match</span> : ''}
            {movies && movies.first_air_date ? <span className="match__year">{movies.first_air_date.slice(0, 4)}</span> : ''}
            <span className="match__adult">13+</span>
          </p>
          <p className="genres">
            {movies && movies.genres.map(item => <span key={item.id}>{item.name}</span>)}
          </p>
          <p className="overview">{movies && movies.overview}</p>
          <div className="btn">
            <button className="red" onClick={() => addToFavorites(id)}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
              Add to My List
            </button>
            <button className="white" onClick={() => setShowDetail(true)}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
      <MovieDetail selectedMovie={movies} showPopup={showDetail} setShowPopup={setShowDetail} />
    </div>
  )
}

export default MovieDetailPage
