import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

const SavedMovies = ({
  isLoggedIn,
  isLoading,
  getSavedMovies,
  deleteMovie,
  savedMovies,
  onSearch,
  movies,
  setQuerySaved
}) => {
  const [isRenderShortMovies, setIsRenderShortMovies] = useState(false);

  const filterShortMovies = (movies) => movies.filter((movie) => movie.duration <= 40);

  const isMovieSaved = (movie) => savedMovies.some((item) => item.movieId === movie.id);

  useEffect(() => {
    getSavedMovies();

    return () => {
      setQuerySaved('')
    }
  }, [])

  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearch } setIsRenderShortMovies={ setIsRenderShortMovies } isSavedMovies={ true } />
      {
        isLoading && <Preloader />
      }
      {
        !isLoading && <MoviesCardList isSavedMovies={ true } onClickLike={ deleteMovie } movies={ isRenderShortMovies ? filterShortMovies(movies) : movies } isMovieSaved={ isMovieSaved } />
      }
      <Footer />
    </>
  );
}

export default SavedMovies;
