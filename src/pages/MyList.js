import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiJson from '../apiServiceJson';
import noImg from '../no-img.jpg';
import Slider from "react-slick";
import '../libraries/slick/slick.css';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const MyList = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const settings = {
    autoplay: true,
    arrows: false,
    dots: true,
    speed: 3000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const getMovies = async () => {
    setLoading(false);
    const res = await apiJson.get('/favorites');
    setMovies(res.data);
    setLoading(true);
  }

  const deleteToFavorites = async (id) => {
    try {
      const deleteData = await apiJson.delete(`/favorites/${id}`);
      console.log(deleteData);
      toast.error(`${deleteData} deleted`);
      getMovies();
    } catch (error) {
      toast(error.message);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div id="tvshow" className="archive archive--tvshow">
      {loading ?
        <div>
          <div className="archive__first-view">
            <Slider {...settings}>
              {movies && movies.map((movie, i) => i < 5 ? <div className="item" key={movie.id}><div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : noImg}')`}}></div></div> : '')}
            </Slider>
          </div>
          <div className="archive__title">
            <h2>My List</h2>
          </div>
          <ul className="archive__list">
            {movies && movies.map(movie =>
              <li key={movie.id}>
                <button onClick={() => deleteToFavorites(movie.id)}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></button>
                <Link to={`/movie/${movie.id}`}>
                  <div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noImg}')`}}></div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      : <Loading />}
    </div>
  )
}

export default MyList
