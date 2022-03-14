import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
const Movies = ({ isLoggedIn, isLoading, onSearchSubmit, onClickLike, movies, isMovieSaved, isRenderShortMovies, onFilterShortMovies, filterShortMovies }) => {
  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearchSubmit } onToggleCheckbox={ onFilterShortMovies } checked={ isRenderShortMovies } />
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
