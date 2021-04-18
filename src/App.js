import './App.css';

// COMPONENTS
import AlertMsg from './components/AlertMsg';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieDetail from './components/MovieDetail';

// PAGES
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';

// LIBRARY
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState([]);

  return (
    <Router>
      <Header />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={() => <Home selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} setShowPopup={setShowPopup} />} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
      <MovieDetail selectedMovie={selectedMovie} showPopup={showPopup} setShowPopup={setShowPopup} />
    </Router>
  );
}

export default App;
