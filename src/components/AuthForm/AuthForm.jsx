import { Link } from 'react-router-dom';
import './AuthForm.css'

const AuthForm = ({ formTitle, children, submitText, linkTo, linkDescriptionText, linkText }) => {
  return (
    <>
      <h2 className="form__title">{ formTitle }</h2>
      <form className="form">
        { children }

        <button className="form__submit-btn" type="submit">{ submitText }</button>

        <span className="form__text">
          { linkDescriptionText } <Link to={`/${linkTo}`} className="form__link">{ linkText }</Link>
        </span>
      </form>
    </>
  );
}

export default AuthForm;
