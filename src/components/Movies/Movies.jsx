import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  isLoggedIn,
  isLoading,
  movies,
  isRenderShortMovies,
  setIsRenderShortMovies,
  filterShortMovies,
  addMovie,
  deleteMovie,
  savedMovies,
  onSearch,
  query
}) => {
  const onClickLike = (movie, isLiked) => {
    if (isLiked) {
      addMovie(movie)
    } else {
      deleteMovie(movie)
    }
  }

  const isMovieSaved = (movie) => savedMovies.some((item) => item.movieId === movie.id);

  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearch } setIsRenderShortMovies={ setIsRenderShortMovies } checked={ isRenderShortMovies } userQuery={ query } />
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
