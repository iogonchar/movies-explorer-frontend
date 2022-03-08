import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={ isLoggedIn } />
      <SearchForm />
      <MoviesCardList isSavedMovies={ true } />
      <Footer />
    </>
  );
}

export default SavedMovies;
