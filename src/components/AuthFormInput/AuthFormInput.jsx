import './AuthFormInput.css';

const AuthFormInput = ({ id, title, type, placeholder, minLength, pattern, maxLength, value, errorText, onChange }) => {
  return (
    <article className="form__field">
      <label className="form__label" for={ id }>{ title }</label>
      <input
        className="form__input"
        id={ id }
        type={ type }
        name={ id }
        placeholder={ placeholder }
        minLength={ minLength }
        maxLength={ maxLength }
        value={ value }
        pattern={ pattern }
        onChange={ onChange }
        required
      />
      <span className={`form__input-error ${ errorText && 'form__input-error--visible' }`}>
        { errorText }
      </span>
    </article>
  );
}

export default AuthFormInput;
