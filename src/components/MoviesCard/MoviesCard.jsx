import { useState } from 'react';
import './MoviesCard.css';
import remove from '../../images/remove.svg';
import liked from '../../images/liked.svg';
import notLiked from '../../images/not-liked.svg';

const MoviesCard = ({ isSavedMovies, movie, onClickLike, isMovieSaved  }) => {
  const { nameRU, duration, trailer, image } = movie;

  const getDuration = (duration) => {
    const hours = Math.trunc(duration / 60)
    const minutes = duration % 60
    return `${ hours > 0 ? hours + 'ч ' : '' }${ minutes }м`
  }

  const isSaved = isMovieSaved(movie);

  const handleClickLike = () => {
    onClickLike(movie, !isSaved)
  }

  const handleClickDelete = () => {
    console.log('delete');
    onClickLike(movie, false)
  }

  return (
    <div className="card">
      <a href={ trailer } target="_blank">
        <img className="card__img" src={ image } alt="Постер"/>
      </a>
      <div className="card-description">
        <h2 className="card__title">{ nameRU }</h2>
        {
          isSavedMovies
            ? (
              <button className="card__button" onClick={ handleClickDelete }>
                <img src={ remove } className="card__button-icon" alt="Удалить" />
              </button>
            )
            : (
              <button className="card__button" onClick={ handleClickLike }>
                {
                  isSaved
                    ? ( <img src={ liked } className="card__button-icon" alt="Убрать лайк" /> )
                    : ( <img src={ notLiked } className="card__button-icon" alt="Поставить лайк" /> )
                }
              </button>
            )
        }
      </div>
      <p className="card__duration">{ getDuration(duration) }</p>
    </div>
  );
}

export default MoviesCard;
