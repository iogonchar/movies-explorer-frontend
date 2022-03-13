import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';

const Movies = ({ isLoggedIn, isLoading, onSearchSubmit, onClickLike, movies, isMovieSaved }) => {
  const [isRenderShortMovies, setIsRenderShortMovies] = useState(false);

  const onFilterShortMovies = (isCheckboxEnabled) => {
    setIsRenderShortMovies(isCheckboxEnabled);
  }

  const filterShortMovies = (movies) => movies.filter((movie) => movie.duration <= 40);

  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearchSubmit } onToggleCheckbox={ onFilterShortMovies } />
      {
        isLoading && <Preloader />
      }
      {
        !isLoading && <MoviesCardList
          isSavedMovies={ false }
          onClickLike={ onClickLike }
          movies={ isRenderShortMovies ? filterShortMovies(movies) : movies }
          isMovieSaved={ isMovieSaved }
        />
      }
      <Footer />
    </>
  );
}

export default Movies;
