import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const Movies = ({ isLoggedIn, isLoading, onSearchSubmit, onClickLike, movies, isMovieSaved }) => {
  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearchSubmit } />
      {
        isLoading && <Preloader />
      }
      {
        !isLoading && <MoviesCardList isSavedMovies={ false } onClickLike={ onClickLike } movies={ movies } isMovieSaved={ isMovieSaved } />
      }
      <Footer />
    </>
  );
}

export default Movies;
