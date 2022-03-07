import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <Header isLoggedIn={ isLoggedIn } />

      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/signup'>
          <Register/>
        </Route>

        <Route path='/signin'>
          <Login/>
        </Route>

        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
