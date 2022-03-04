import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ isSavedMovies }) => {
  return (
    <section className="cards-wrapper">
      <div className="cards">
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
        <MoviesCard isSavedMovies={ isSavedMovies } />
      </div>
      <div className="cards-load-more">
        <button className="cards-load-more__text" type="button">Ещё</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
