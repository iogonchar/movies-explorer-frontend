import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

const AboutMe = () => {
  return (
    <section className="about-me-wrapper" id="about-me">
      <div className="about-me">
        <SectionTitle title="Студент" />

        <div className="about-me-content">
          <div className="about-me-info">
            <h3 className="about-me-info__name">Гончар Илья</h3>
            <p className="about-me-info__description">Фронтенд-разработчик, 25 лет</p>
            <p className="about-me-info__text">
              Закочнил СПбГУТ им. проф. М.А. Бонч-Бруевича. <br />
              В данный момент живу и работаю в Санкт-Петербурге. <br />
              В свободное время люблю кататься на сноуборде. <br />
              Увлекаюсь компьютерными играми, а ранее участвовал в киберспортивных соревнованиях по нескольким дисциплинам.
            </p>

            <ul className="about-me__links">
              <li className="about-me__links-item">
                <a className="about-me__link" href="https://vk.com/hancorg" target="_blank">VK</a>
              </li>
              <li className="about-me__links-item">
                <a className="about-me__link" href="https://github.com/iogonchar" target="_blank">Github</a>
              </li>
            </ul>
          </div>

          <img className="about-me__photo" src={ photo } alt="Фото"/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
