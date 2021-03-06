import { React, useState, useEffect } from 'react';
import logo from '../logo.svg';
import avatar from '../avatar.png';
import { useHistory, Link } from 'react-router-dom';
import api from '../apiService';
import DropdownItem from './DropdownItem';
import Loading from './Loading';

const API_KEY = process.env.REACT_APP_API_KEY;

const Header = ({ currentState, setCurrentState, setSearch, searchCurrentPage, setSearchTotalPage }) => {
  const history = useHistory();
  const [status, setStatus] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const handlePage = (pageName) => {
    setCurrentState(pageName);
  }

  const handleLoadMore = () => {
    setCurrentPage(state => state + 1);
  }

  const handleSearch = async () => {
    history.push(`/`);
    setCurrentState('Home');
    let url = `search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${searchCurrentPage}&include_adult=false`;
    const res = await api.get(url);
    setSearch(res.data);
    setSearchTotalPage(res.data.total_pages);
  }

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setStatus('header--scroll');
      } else {
        setStatus('');
      }
    }
  }, [status]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(false);
      let url = `movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
      const res = await api.get(url);
      setMovies((c) => [...c, ...res.data.results]);
      setLoading(true);
    }
    getMovies();
  }, [currentPage])

  useEffect(() => {
    if(!keyword) return;
    handleSearch();
  }, [keyword, searchCurrentPage]);

  return (
    <header id="header" className={`header ${status ? 'header--scroll' : ''}`}>
      <div className="header__left">
        <a href="/" className="logo">
          <img src={logo} alt="Netflix"/>
        </a>
        <ul className="directory">
          <li><Link to="/" onClick={() => handlePage('Home')} className={currentState === 'Home' ? 'current' : ''}>Home</Link></li>
          <li><Link to="/tvshows" onClick={() => handlePage('TV Shows')} className={currentState === 'TV Shows' ? 'current' : ''}>TV Shows</Link></li>
          <li><Link to="/movies" onClick={() => handlePage('Movies')} className={currentState === 'Movies' ? 'current' : ''}>Movies</Link></li>
          <li><Link to="/popular" onClick={() => handlePage('Popular')} className={currentState === 'Popular' ? 'current' : ''}>New &amp; Popular</Link></li>
          <li><Link to="/mylist" onClick={() => handlePage('My List')} className={currentState === 'My List' ? 'current' : ''}>My List</Link></li>
        </ul>
      </div>
      <div className="header__right">
        <ul className="personal">
          <li>
            <form onSubmit={(e) => {e.preventDefault(); setKeyword(e.target.searchInput.value)}}>
              <input type="text" name="searchInput" placeholder="Titles, people, genres" />
              <button type="submit"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></button>
            </form>
            </li>
          <li>
            <Link to="/"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gift" className="svg-inline--fa fa-gift fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"></path></svg></Link>
          </li>
          <li className="dropdown">
            <Link to="/"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" className="svg-inline--fa fa-bell fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg></Link>
            <div className="dropdown__list">
              {movies && movies.map((movie) => <DropdownItem movie={movie} />)}
              {loading ? '' : <Loading />}
              <button className="dropdown__btn" onClick={handleLoadMore}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" className="svg-inline--fa fa-spinner fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
                Load more
              </button>
            </div>
          </li>
          <li>
            <Link to="/">
              <div className="avatar" style={{backgroundImage: `url('${avatar}')`}}></div>
              <div className="caret"></div>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
