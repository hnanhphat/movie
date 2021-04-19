import './App.css';

// COMPONENTS
import Header from './components/Header';
import AlertMsg from './components/AlertMsg';
import Footer from './components/Footer';
// import MovieDetail from './components/MovieDetail';

// PAGES
import Home from './pages/Home';
import TvDetailPage from './pages/TvDetailPage';
import MovieDetailPage from './pages/MovieDetailPage';
import TvShowPage from './pages/TvShowPage';
import MoviesPage from './pages/MoviesPage';
import PopularPage from './pages/PopularPage';
import TrendingPage from './pages/TrendingPage';
import TopRatedPage from './pages/TopRatedPage';
import MyList from './pages/MyList';
import NotFoundPage from './pages/NotFoundPage';

// LIBRARY
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [currentState, setCurrentState] = useState('Home');

  const [search, setSearch] = useState('');
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPage, setSearchTotalPage] = useState(1);

  return (
    <Router>
      <Header currentState={currentState} setCurrentState={setCurrentState} setSearch={setSearch} searchCurrentPage={searchCurrentPage} setSearchTotalPage={setSearchTotalPage} />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={() => <Home setCurrentState={setCurrentState} search={search} searchCurrentPage={searchCurrentPage} setSearchCurrentPage={setSearchCurrentPage} searchTotalPage={searchTotalPage} />} />
        <Route path="/tvshows" component={TvShowPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/popular" component={PopularPage} />
        <Route path="/trending" component={TrendingPage} />
        <Route path="/toprated" component={TopRatedPage} />
        <Route path="/mylist" component={MyList} />
        <Route exact path="/tv/:id" component={TvDetailPage} />
        <Route exact path="/movie/:id" component={MovieDetailPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
