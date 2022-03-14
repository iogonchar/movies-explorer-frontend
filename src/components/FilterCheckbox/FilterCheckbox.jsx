import './FilterCheckbox.css';

const FilterCheckbox = ({ onToggleCheckbox, checked }) => {
  const handleToggleCheckbox = (e) => onToggleCheckbox(e.target.checked);

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" checked={ checked } onChange={ handleToggleCheckbox } />
    </div>
  )
}

export default FilterCheckbox;
