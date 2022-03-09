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
  } = useFormWithValidation({})

  const handleSignOut = () => {
    onSignOut();
  }

  const handleProfileUpdate = (evt) => {
    evt.preventDefault();
    const name = values.name ? values.name : currentUser.name;
    const email = values.email ? values.email : currentUser.email;
    console.log('!!! name', name, 'email', email);
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
              placeholder={ currentUser.name }
              pattern="[a-zA-Z -]{2,30}"
              value={ values.name || '' }
              onChange={ handleChange }
            />
          </article>

          <article className="profile-form__field">
            <label className="profile-form__label" for="name">Почта</label>
            <input
              className="profile-form__input"
              id="email"
              type="email"
              name="email"
              placeholder={ currentUser.email }
              minLength="5"
              maxLength="100"
              value={ values.email || '' }
              onChange={ handleChange }
            />
          </article>

          <div className="profile__buttons">
            <button className="profile__button profile__button--type-edit" type="submit">Редактировать</button>
            <button className="profile__button profile__button--type-exit" onClick={ handleSignOut }>Выйти из аккаунта</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
