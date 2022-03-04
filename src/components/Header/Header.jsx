import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileWhite from '../../images/profileWhite.svg';
import profileBlack from '../../images/profileBlack.svg';
import './Header.css';

const Header = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header-wrapper">
      <div className="header">
        <NavLink to="/" className="header-logo">
          <img src={logo} alt="Логотип"/>
        </NavLink>

        {
          isLoggedIn
            ? (
              <>
                <div className={ `small-nav ${ isMenuOpen && 'small-nav--visible' } `}>
                  <nav className="header-menu">
                    <NavLink to="/" className="header-auth__link">Главная</NavLink>
                    <NavLink to="/movies" className="header-auth__link">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="header-auth__link">Сохранённые фильмы</NavLink>
                    <NavLink to="/profile" className="header-auth__profile">
                      <img src={ isMenuOpen ? profileBlack : profileWhite } alt="Аккаунт" className="header-auth__profile-img"/>
                      <span className="header-auth__profile-text">Аккаунт</span>
                    </NavLink>

                    <div className="small-nav__hamburger small-nav__hamburger--close" onClick={ handleToggleMenu }>
                      <div className="small-nav__close"></div>
                    </div>
                  </nav>
                </div>
                <div className="small-nav__hamburger small-nav__hamburger--open" onClick={ handleToggleMenu }>
                  <div className="small-nav__open"></div>
                </div>
              </>
            )
            : (
              <nav className="header-auth">
                <NavLink to="/signup" className="header-auth__signup">Регистрация</NavLink>
                <NavLink to="/signin" className="header-auth__signin">Войти</NavLink>
              </nav>
            )
        }

      </div>
    </header>
  );
}

export default Header;
