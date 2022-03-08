import AuthForm from '../AuthForm/AuthForm';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import logo from '../../images/logo.svg';
import './Login.css'

const Login = () => {
  return (
    <section className="login-wrapper">
      <div className="login">
        <img className="login__logo" src={logo} alt="Логотип"/>

        <AuthForm
          formTitle="Рады видеть!"
          submitText="Войти"
          linkTo="signup"
          linkDescriptionText="Ещё не зарегистрированы?"
          linkText="Регистрация"
        >
          <AuthFormInput
            id="email"
            title="E-mail"
            type="email"
            placeholder="Введите E-mail"
          />

          <AuthFormInput
            id="password"
            title="Пароль"
            type="password"
            placeholder="Введите пароль"
          />
        </AuthForm>
      </div>
    </section>
  );
}

export default Login;
