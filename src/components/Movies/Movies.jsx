import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

const Movies = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm />
      <MoviesCardList isSavedMovies={ false } />
      <Footer />
    </>
  );
}

export default Movies;
