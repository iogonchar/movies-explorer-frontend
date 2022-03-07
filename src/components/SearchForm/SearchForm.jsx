import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-btn.svg';
import './SearchForm.css'

const SearchForm = () => {
  return (
    <section className="search">
      <form name="search" className="search-form">
        <input className="search-form__input" placeholder="Фильм"/>
        <button className="search-form__search-btn">
          <img className="search-form__search-btn-img" src={ searchIcon } alt="Искать"/>
        </button>
      </form>
      <div className="search-filter">
        <FilterCheckbox/>
        <span className="search-filter__text">Короткометражки</span>
      </div>
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
