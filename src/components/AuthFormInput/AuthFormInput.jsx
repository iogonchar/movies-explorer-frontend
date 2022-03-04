import './AuthFormInput.css';

const AuthFormInput = ({ id, title, type, placeholder }) => {
  return (
    <article className="form__field">
      <label className="form__label" for={ id }>{ title }</label>
      <input
        className="form__input"
        id={ id }
        type={ type }
        name={ id }
        placeholder={ placeholder }
        required
      />
    </article>
  );
}

export default AuthFormInput;
