import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import logo from '../../images/logo.svg';
import './Login.css'

const Login = ({ onLoginSubmit }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({})

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    onLoginSubmit(values);
    resetForm()
  }

  return (
    <section className="login-wrapper">
      <div className="login">
        <NavLink to="/" className="header-logo">
          <img className="login__logo" src={logo} alt="Логотип"/>
        </NavLink>

        <AuthForm
          formTitle="Рады видеть!"
          submitText="Войти"
          linkTo="signup"
          linkDescriptionText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          isFormValid={ isValid }
          handleSubmit={ handleLoginSubmit }
        >
          <AuthFormInput
            id="email"
            title="E-mail"
            type="email"
            placeholder="Введите E-mail"
            minLength="5"
            maxLength="100"
            pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
            value={ values.email || '' }
            errorText={ errors.email }
            onChange={ handleChange }
          />

          <AuthFormInput
            id="password"
            title="Пароль"
            type="password"
            placeholder="Введите пароль"
            minLength="8"
            value={ values.password || '' }
            errorText={ errors.password }
            onChange={ handleChange }
          />
        </AuthForm>
      </div>
    </section>
  );
}

export default Login;
