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
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [querySaved, setQuerySaved] = useState('');
  const [isRenderShortMovies, setIsRenderShortMovies] = useState(localStorage.getItem('moviesCheckbox') === 'true');

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
    localStorage.removeItem('filteredMovies');
    localStorage.removeItem('moviesCheckbox');
    localStorage.removeItem('moviesQuery');
    setIsLoggedIn(false);
    setCurrentUser({});
    setInitialMovies([]);
    setSavedMovies([]);
    setQuery('');
    setFilteredMovies([]);
    setFilteredSavedMovies([]);
    setQuerySaved('');

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

  const filter = (movies, query, saveFilterMovies) => {
    if (query) {
      const filterMovies = movies.filter((item) => {
        return (
          item.nameRU?.toLowerCase().includes(query.toLowerCase()) ||
          item.nameEN?.toLowerCase().includes(query.toLowerCase())
        )
      })

      if (saveFilterMovies) {
        localStorage.setItem('filteredMovies',  JSON.stringify(filterMovies));
      }

      return filterMovies;
    }
    return []
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

    if (localStorage.getItem('moviesQuery')) {
      setQuery(localStorage.getItem('moviesQuery'));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getInitialMovies();
      getSavedMovies();

      if (JSON.parse(localStorage.getItem('initialMovies'))) {
        setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')));
      } else {
        getInitialMovies();
      }
    }
  }, [isLoggedIn])

  const getSavedMovies = () => {
    api.getMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        console.log(err)
      })
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
          setFilteredSavedMovies(filter(updatedSavedMovies, querySaved))
        }
      })
      .catch((err) => {
        setPopupText('На сервере произошла ошибка');
        setIsPopupOpen(true);
      });
  }

  const onSearch = (query) => {
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('moviesQuery',  query);
      setQuery(query)
      setFilteredMovies(filter(initialMovies, query, true))
      setIsLoading(false)
    }, 1000)
  }

  const renderMovies = localStorage.getItem('filteredMovies')
    ? JSON.parse(localStorage.getItem('filteredMovies'))
    : query ? filteredMovies : initialMovies

  const filterShortMovies = (movies) => movies.filter((movie) => movie.duration <= 40);
  const renderSavedMovies = querySaved ? filteredSavedMovies : savedMovies;

  const onSearchSaved = (querySaved) => {
    setIsLoading(true)
    setTimeout(() => {
      setQuerySaved(querySaved)
      setFilteredSavedMovies(filter(savedMovies, querySaved))
      setIsLoading(false)
    }, 1000)
  }

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
            component={ Movies }
            isRenderShortMovies={ isRenderShortMovies }
            setIsRenderShortMovies={ setIsRenderShortMovies }
            filterShortMovies={ filterShortMovies }
            deleteMovie={ deleteMovie }
            addMovie={ addMovie }
            savedMovies={ savedMovies }
            onSearch={ onSearch }
            movies={ renderMovies }
            query={ query }
          />

          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={ isLoggedIn }
            isLoading={ isLoading }
            component={ SavedMovies }
            getSavedMovies={ getSavedMovies }
            deleteMovie={ deleteMovie }
            savedMovies={ savedMovies }
            onSearch={ onSearchSaved }
            movies={ renderSavedMovies }
            setQuerySaved={ setQuerySaved }
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
