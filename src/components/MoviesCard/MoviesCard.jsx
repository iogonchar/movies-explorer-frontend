import { useState } from 'react';
import './MoviesCard.css';
import card from '../../images/card.jpg';
import remove from '../../images/remove.svg';
import liked from '../../images/liked.svg';
import notLiked from '../../images/not-liked.svg';

const MoviesCard = ({ isSavedMovies }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked(!isLiked);
  }

  return (
    <div className="card">
      <img className="card__img" src={ card } alt="Постер"/>
      <div className="card-description">
        <h2 className="card__title">Gimme Danger: История Игги и The Stooges</h2>
        {
          isSavedMovies
            ? (
              <button className="card__button">
                <img src={ remove } className="card__button-icon" alt="Удалить" />
              </button>
            )
            : (
              <button className="card__button" onClick={ handleClickLike }>
                {
                  isLiked
                    ? ( <img src={ liked } className="card__button-icon" alt="Убрать лайк" /> )
                    : ( <img src={ notLiked } className="card__button-icon" alt="Поставить лайк" /> )
                }
              </button>
            )
        }
      </div>
      <p className="card__duration">1ч 42м</p>
    </div>
  );
}

export default MoviesCard;
