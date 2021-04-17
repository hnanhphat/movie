import './App.css';

// COMPONENTS
import AlertMsg from './components/AlertMsg';
import Header from './components/Header';
import Footer from './components/Footer';

// PAGES
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';

// LIBRARY
// import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  // const [source, setSource] = useState('');
  return (
    <Router>
      <Header />
      <AlertMsg />
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
