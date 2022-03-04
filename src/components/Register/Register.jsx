import AuthForm from '../AuthForm/AuthForm';
import AuthFormInput from '../AuthFormInput/AuthFormInput';
import logo from '../../images/logo.svg';
import './Register.css'

const Register = () => {
  return (
    <section className="register-wrapper">
      <div className="register">
        <img src={logo} alt="Логотип"/>

        <AuthForm
          formTitle="Добро пожаловать!"
          submitText="Зарегистрироваться"
          linkTo="signin"
          linkDescriptionText="Уже зарегистрированы?"
          linkText="Войти"
        >
          <AuthFormInput
            id="name"
            title="Имя"
            type="text"
            placeholder="Введите имя"
          />

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

export default Register;
