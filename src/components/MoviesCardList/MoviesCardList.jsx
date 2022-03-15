import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ isSavedMovies, onClickLike, movies, isMovieSaved }) => {
  const [loadMoreCount, setLoadMoreCount] = useState(3);
  const [renderMovies, setRenderMovies] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  const getMoviesCount = (width) => {
    if (width > 768) {
      return { initial: 12, more: 3 }
    } else if (width > 480 && width <= 768) {
      return { initial: 8, more: 2 }
    } else {
      return { initial: 5, more: 2 }
    }
  };

  const renderMoreMovies = () => {
    const count = Math.min(movies.length, renderCount + loadMoreCount);
    const extraMovies = movies.slice(renderCount, count);
    setRenderMovies([...renderMovies, ...extraMovies]);
    setRenderCount(count);
  }

  const handleLoadMoreMovies = () => {
    renderMoreMovies();
  }

  const handleResize = () => {
    const width = window.innerWidth;
    const renderOptions = getMoviesCount(width);
    setLoadMoreCount(renderOptions.more);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect(() => {
    const width = window.innerWidth;
    const renderOptions = getMoviesCount(width);
    setLoadMoreCount(renderOptions.more);
    const count = Math.min(movies.length, renderOptions.initial);
    setRenderMovies(movies.slice(0, count));
    setRenderCount(count);
  }, [movies])

  return (
    <section className="cards-wrapper">
      {
        renderMovies.length === 0
        ? (<p className="cards__not-found">Ничего не найдено</p>)
        : (<div className="cards">
          {
            renderMovies.map((movie) => (
              <MoviesCard
                key={ movie.id ? movie.id : movie.movieId }
                onClickLike={ onClickLike }
                movie={ movie }
                isSavedMovies={ isSavedMovies }
                isMovieSaved={ isMovieSaved }
              />
            ))
          }
        </div>)
      }
      {
        renderCount < movies.length && (
          <div className="cards-load-more">
            <button className="cards-load-more__text" type="button" onClick={ handleLoadMoreMovies }>Ещё</button>
          </div>
        )
      }

    </section>
  );
}

export default MoviesCardList;
