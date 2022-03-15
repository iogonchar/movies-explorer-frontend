import { useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ setIsRenderShortMovies, isSavedMovies }) => {
  const [checked, setChecked] = useState(isSavedMovies ? false : localStorage.getItem('moviesCheckbox') === 'true');

  const handleToggleCheckbox = (e) => {
    if (!isSavedMovies) {
      localStorage.setItem('moviesCheckbox',  e.target.checked);
    }

    setChecked(!checked)
    setIsRenderShortMovies(!checked)
  };

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" checked={ checked } onChange={ handleToggleCheckbox } />
    </div>
  )
}

export default FilterCheckbox;
