import './NavTab.css';

const NavTab = () => {
  return (
    <ul className="nav">
      <li className="nav__item">
        <a href="#about-project" className="nav__link">
          О проекте
        </a>
      </li>

      <li className="nav__item">
        <a href="#techs" className="nav__link">
          Технологии
        </a>
      </li>

      <li className="nav__item">
        <a href="#about-me" className="nav__link">
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
