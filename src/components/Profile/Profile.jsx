import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Profile.css';

const Profile = ({ onSignOut, onProfileUpdate }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({});

  const isNameChanged = !(values.name === currentUser.name) && !(values.name === undefined);
  const isEmailChanged = !(values.email === currentUser.email) && !(values.email === undefined);
  const isChangedValue = isNameChanged || isEmailChanged;
  const isFormValid = isValid && isChangedValue;

  const handleSignOut = () => {
    onSignOut();
  }

  const handleProfileUpdate = (evt) => {
    evt.preventDefault();
    const name = values.name ? values.name : currentUser.name;
    const email = values.email ? values.email : currentUser.email;
    onProfileUpdate({ name, email });
    resetForm();
  }

  return (
    <>
      <Header isLoggedIn />
      <section className="profile">
        <h2 className="profile__title">Привет, { currentUser.name }!</h2>

        <form className="profile-form" onSubmit={ handleProfileUpdate } noValidate >
          <article className="profile-form__field">
            <label className="profile-form__label" for="name">Имя</label>
            <input
              className="profile-form__input"
              id="name"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              pattern="[a-zA-Z -]{2,30}"
              value={ (values.name || values.name === '') ? values.name : currentUser.name }
              onChange={ handleChange }
              required
            />
          </article>
          <span className="profile__input-error">
              {errors.name}
          </span>

          <article className="profile-form__field">
            <label className="profile-form__label" for="name">Почта</label>
            <input
              className="profile-form__input"
              id="email"
              name="email"
              type="email"
              placeholder="Почта"
              minLength="5"
              maxLength="100"
              pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
              value={ (values.email || values.email === '') ? values.email : currentUser.email }
              onChange={ handleChange }
            />
          </article>
          <span className="profile__input-error">
              {errors.email}
          </span>

          <div className="profile__buttons">
            <button className={ `profile__button profile__button--type-edit  ${ isFormValid ? '' : 'profile__button--type-edit-disabled' }` } type="submit" disabled={ !isFormValid }>Редактировать</button>
            <button className="profile__button profile__button--type-exit" onClick={ handleSignOut }>Выйти из аккаунта</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
