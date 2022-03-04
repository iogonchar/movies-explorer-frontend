import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const Movies = () => {
  return (
    <>
        <SearchForm />
        <MoviesCardList isSavedMovies={ false } />
    </>
  );
}

export default Movies;
