import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-btn.svg';
import './SearchForm.css'

const SearchForm = ({ onSearchSubmit, onToggleCheckbox, checked }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (evt) => {
    setQuery(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchSubmit(query);
  }

  return (
    <section className="search">
      <form name="search" className="search-form" onSubmit={ handleSubmit }>
        <input className="search-form__input" placeholder="Фильм" required onChange={ handleInputChange } />
        <button className="search-form__search-btn">
          <img className="search-form__search-btn-img" src={ searchIcon } alt="Искать"/>
        </button>
      </form>
      <div className="search-filter">
        <FilterCheckbox onToggleCheckbox={ onToggleCheckbox } checked={ checked } />
        <span className="search-filter__text">Короткометражки</span>
      </div>
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
