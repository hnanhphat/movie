import React from 'react';
import FirstView from '../components/FirstView';
import CurrentPlaying from '../components/CurrentPlaying';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import TopRated from '../components/TopRated';

// const NOW_PLAYING = 'movie/now_playing';
// const GENRE = '/genre/movie/list';

const Home = ({ selectedMovie, setSelectedMovie, setShowPopup }) => {
  const showDetail = (item) => {
    setShowPopup(true);
    if (selectedMovie?.id !== item.id) {
      setSelectedMovie(item);
    }
  };

  return (
    <div id="main">
      <FirstView />
      <CurrentPlaying showDetail={showDetail} />
      <Popular showDetail={showDetail} />
      <Trending showDetail={showDetail} />
      <TopRated showDetail={showDetail} />
    </div>
  )
}

export default Home
