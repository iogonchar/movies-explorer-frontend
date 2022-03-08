import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Profile.css';

const Profile = () => {
  return (
    <>
      <Header isLoggedIn />
      <section className="profile">
        <h2 className="profile__title">Привет, Илья!</h2>

        <form className="profile-form">
          <article className="profile-form__field">
            <label className="profile-form__label" for="name">Имя</label>
            <input
              className="profile-form__input"
              id="name"
              type="text"
              name="name"
              placeholder="Имя"
            />
          </article>

          <article className="profile-form__field">
            <label className="profile-form__label" for="name">Почта</label>
            <input
              className="profile-form__input"
              id="email"
              type="email"
              name="email"
              placeholder="Почта"
            />
          </article>

          <div className="profile__buttons">
            <button className="profile__button profile__button--type-edit">Редактировать</button>
            <button className="profile__button profile__button--type-exit">Выйти из аккаунта</button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
