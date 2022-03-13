import './FilterCheckbox.css';

const FilterCheckbox = ({ onToggleCheckbox }) => {
  const handleToggleCheckbox = (e) => onToggleCheckbox(e.target.checked);

  return (
    <div className="checkbox-container">
      <input className="checkbox" type="checkbox" onChange={ handleToggleCheckbox } />
    </div>
  )
}

export default FilterCheckbox;
