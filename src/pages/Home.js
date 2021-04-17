import React from 'react';
import FirstView from '../components/FirstView';
import CurrentPlaying from '../components/CurrentPlaying';
import Popular from '../components/Popular';
import Trending from '../components/Trending';
import TopRated from '../components/TopRated';

// const NOW_PLAYING = 'movie/now_playing';
// const GENRE = '/genre/movie/list';

const Home = () => {
  return (
    <div id="main">
      <FirstView />
      <CurrentPlaying />
      <Popular />
      <Trending />
      <TopRated />
    </div>
  )
}

export default Home
