import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Popup from '../Popup/Popup'
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../context/CurrentUserContext';

import api from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [initialMovies, setInitialMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [savedMoviesQuery, setSavedMoviesQuery] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [filterSavedMovies, setFilterSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');

  const history = useHistory()
  const location = useLocation();

  const login = (email, password) => {
    api.login(email, password)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token)
        setIsLoggedIn(true)
        getCurrentUser()
        history.push('/movies')
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getCurrentUser = () => {
    api.getCurrentUser(localStorage.getItem('token'))
      .then((res) => {
        setCurrentUser(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
      })
      .catch((err) => {
          setPopupText('При авторизации произошла ошибка');
          setIsPopupOpen(true);
      })
  }

  const onRegisterSubmit = ({ name, email, password }) => {
    api.register(name, email, password)
      .then((res) => {
        if (res) {
          login(email, password);
        }
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 409') {
          setPopupText('Пользователь с таким email уже существует');
          setIsPopupOpen(true);
        } else {
          setPopupText('При регистрации пользователя произошла ошибка');
          setIsPopupOpen(true);
        };
      })
  }

  const onLoginSubmit = ({ email, password }) => {
    login(email, password);
  }

  const onSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('initialMovies');
    localStorage.removeItem('savedMovies');
    setIsLoggedIn(false);
    setCurrentUser({});
    setFilterMovies([]);
    setSavedMovies([]);
    setFilterSavedMovies([]);
    setInitialMovies([]);

    history.push('/')
  }

  const onProfileUpdate = ({ name, email }) => {
    api.updateProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setPopupText('Пользователь с таким email уже существует');
          setIsPopupOpen(true);
        } else {
          setPopupText('При обновлении профиля произошла ошибка');
          setIsPopupOpen(true);
        }
      })
  }

  // ----------------------------------------
  const getInitialMovies = () => {
    moviesApi.getMovies()
      .then((res) => {
        const movies = res.map((movie) => {
          return {
            ...movie,
            image: `https://api.nomoreparties.co/${movie.image.url}`,
            trailer: movie.trailerLink,
          }
        })

        localStorage.setItem('initialMovies',  JSON.stringify(movies));
        setInitialMovies(movies);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getSavedMovies = () => {
    api.getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const filter = (movies, query) => {
    if (query) {
      const regex = new RegExp(query, 'i')
      const filterMovies = movies.filter((item) => {
        return (regex.test(item.nameRU) || regex.test(item.nameEN));
      })

      return filterMovies;
    }
    return []
  }

  const onSearchFilmsSubmit = (query) => {
    setIsLoading(true)
    setTimeout(() => {
      setQuery(query)
      setFilterMovies(filter(initialMovies, query))
      setIsLoading(false)
    }, 1000)
  }

  const onSearchSavedFilmsSubmit = (query) => {
    setIsLoading(true)
    setTimeout(() => {
      setSavedMoviesQuery(query)
      setFilterSavedMovies(filter(savedMovies, query))
      setIsLoading(false)
    }, 1000)
  }

  const addMovie = (movie) => {
    api.addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        setPopupText('На сервере произошла ошибка');
        setIsPopupOpen(true);
      });
  }

  const deleteMovie = (movie) => {
    const movieId = savedMovies.find((item) => {
      return item._id === movie._id
    })._id;

    api.deleteMovie(movieId)
      .then((res) => {
        if (res) {
          const updatedSavedMovies = savedMovies.filter((item) => {
            return item._id !== movie._id
          })

          setSavedMovies(updatedSavedMovies);

          if (savedMoviesQuery) {
            setFilterSavedMovies(filter(updatedSavedMovies, savedMoviesQuery))
          }
        }
      })
      .catch((err) => {
        setPopupText('На сервере произошла ошибка');
        setIsPopupOpen(true);
      });
  }

  const isMovieSaved = (movie) => savedMovies.some((item) => item.movieId === movie.id);

  const onClickLike = (movie, isLiked) => {
    if (isLiked) {
      addMovie(movie)
    } else {
      deleteMovie(movie)
    }
  }

  const onClosePopup = () => {
    setIsPopupOpen(false);
    setPopupText('');
  }

  useEffect(() => {
    const path = location.pathname;

    if (localStorage.getItem('token')) {
      api.checkToken(localStorage.getItem('token'))
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            getCurrentUser();
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('token');
          history.push('/');
        })
    }

    if (JSON.parse(localStorage.getItem('initialMovies'))) {
      setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')));
    } else {
      getInitialMovies();
    }

    getSavedMovies();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getInitialMovies();
      getSavedMovies();
    }
  }, [isLoggedIn])

  useEffect(() => {
    localStorage.setItem('filterMovies', JSON.stringify(filterMovies))
  }, [filterMovies])

  const [isRenderShortMovies, setIsRenderShortMovies] = useState(false);

  const onFilterShortMovies = (isCheckboxEnabled) => {
    setIsRenderShortMovies(isCheckboxEnabled);
  }

  const filterShortMovies = (movies) => movies.filter((movie) => movie.duration <= 40);

  return (
    <div className="app">
      <CurrentUserContext.Provider value={ currentUser }>

        <Switch>
          <Route exact path='/'>
            <Main isLoggedIn={ isLoggedIn } />
          </Route>

          <ProtectedRoute
            path="/movies"
            isLoggedIn={ isLoggedIn }
            isLoading={ isLoading }
            onSearchSubmit={ onSearchFilmsSubmit }
            onClickLike={ onClickLike }
            movies={ filterMovies }
            isMovieSaved={ isMovieSaved }
            component={ Movies }
            isRenderShortMovies={ isRenderShortMovies }
            onFilterShortMovies={ onFilterShortMovies }
            filterShortMovies={ filterShortMovies }
          />

          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={ isLoggedIn }
            isLoading={ isLoading }
            onSearchSubmit={ onSearchSavedFilmsSubmit }
            onClickLike={ onClickLike }
            movies={ savedMoviesQuery && filterSavedMovies.length !== 0 ? filterSavedMovies : savedMovies }
            isMovieSaved={ isMovieSaved }
            component={ SavedMovies }
          />

          <ProtectedRoute
            path="/profile"
            isLoggedIn={ isLoggedIn }
            onSignOut={ onSignOut }
            onProfileUpdate={ onProfileUpdate }
            component={ Profile }
          />

          <ProtectedRoute
            path="/signup"
            isLoggedIn={ !isLoggedIn }
            onRegisterSubmit={ onRegisterSubmit }
            component={ Register }
          />

          <ProtectedRoute
            path="/signin"
            isLoggedIn={ !isLoggedIn }
            onLoginSubmit={ onLoginSubmit }
            component={ Login }
          />

          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>

        <Popup
          title={ popupText }
          isOpenPopup={ isPopupOpen }
          onClosePopup={ onClosePopup }
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
