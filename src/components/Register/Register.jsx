import { NavLink } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import logo from '../../images/logo.svg';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Register.css'

const Register = ({ onRegisterSubmit }) => {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({})

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    onRegisterSubmit(values);
    resetForm()
  }

  return (
    <section className="register-wrapper">
      <div className="register">
        <NavLink to="/" className="header-logo">
          <img className="register__logo" src={logo} alt="Логотип"/>
        </NavLink>

        <AuthForm
          formTitle="Добро пожаловать!"
          submitText="Зарегистрироваться"
          linkTo="signin"
          linkDescriptionText="Уже зарегистрированы?"
          linkText="Войти"
          isFormValid={ isValid }
          handleSubmit={ handleRegisterSubmit }
        >
          <AuthFormInput
            id="name"
            title="Имя"
            type="text"
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            value={ values.name || '' }
            errorText={ errors.name }
            onChange={ handleChange }
          />

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

export default Register;
