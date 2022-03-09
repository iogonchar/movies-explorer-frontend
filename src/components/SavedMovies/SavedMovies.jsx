import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ isLoggedIn, isLoading, onClickLike, onSearchSubmit, movies, isMovieSaved }) => {
  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm onSearchSubmit={ onSearchSubmit } />
      {
        isLoading && <Preloader />
      }
      {
        !isLoading && <MoviesCardList isSavedMovies={ true } onClickLike={ onClickLike } movies={ movies } isMovieSaved={ isMovieSaved } />
      }
      <Footer />
    </>
  );
}

export default SavedMovies;
