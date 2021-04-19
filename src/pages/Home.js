import React from 'react';
import { Link } from 'react-router-dom';
import FirstView from '../components/FirstView';
import CurrentPlaying from '../components/CurrentPlaying';
import Popular from '../components/Popular';
import TvShow from '../components/TvShow';
import Trending from '../components/Trending';
import TopRated from '../components/TopRated';
import noImg from '../no-img.jpg';
import PaginationBar from '../components/PaginationBar';

const Home = ({ setCurrentState, search, searchCurrentPage, setSearchCurrentPage, searchTotalPage }) => {

  return (
    <div id="main">
      {search !== '' ? 
        <div id="search" className="search">
          <h2 className="search__title">Search Results:</h2>
          <ul className="search__list">
            {search && search.results.map(movie =>
              <li key={movie.id}>
                <Link to={`/${movie.media_type}/${movie.id}`}>
                  <div className="img" style={{backgroundImage: `url('${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : noImg}')`}}></div>
                </Link>
              </li>
              )}
          </ul>
          {searchTotalPage > 1 ? <PaginationBar currentPage={searchCurrentPage} setCurrentPage={setSearchCurrentPage} totalPage={searchTotalPage} /> : ''}
        </div>
      :
        <div id="home">
          <FirstView />
          <CurrentPlaying setCurrentState={setCurrentState} />
          <Popular setCurrentState={setCurrentState} />
          <TvShow setCurrentState={setCurrentState} />
          <Trending setCurrentState={setCurrentState} />
          <TopRated setCurrentState={setCurrentState} />
        </div>
      }
    </div>
  )
}

export default Home
