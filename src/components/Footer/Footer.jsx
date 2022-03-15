import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer">
        <p className="footer-title">Учебный проект Яндекс.Практикум х BeatFilm.</p>

        <div className="footer-info">
          <p className="footer-info__copyright">&copy; { new Date().getFullYear() }</p>

          <ul className="footer-info-links">
            <li className="footer-info-links__item">
              <a href="https://practicum.yandex.ru/" className="footer-info-links__link" target="_blank">Яндекс.Практикум</a>
            </li>
            <li className="footer-info-links__item">
              <a href="https://github.com/iogonchar" className="footer-info-links__link" target="_blank">Github</a>
            </li>
            <li className="footer-info-links__item">
              <a href="https://vk.com/hancorg" className="footer-info-links__link" target="_blank">VK</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
