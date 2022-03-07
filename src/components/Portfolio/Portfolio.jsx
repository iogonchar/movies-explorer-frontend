import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <ul className="portfolio-links">
        <li className="portfolio-links__item">
          <a href="https://github.com/iogonchar/how-to-learn" className="portfolio-links__link" target="_blank">
            <p className="portfolio-links__text">Статичный сайт</p>
            <p className="portfolio-links__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio-links__item">
          <a href="https://github.com/iogonchar/russian-travel" className="portfolio-links__link" target="_blank">
            <p className="portfolio-links__text">Адаптивный сайт</p>
            <p className="portfolio-links__arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio-links__item">
          <a href="https://github.com/iogonchar/react-mesto-api-full" className="portfolio-links__link" target="_blank">
            <p className="portfolio-links__text">Одностраничное приложение</p>
            <p className="portfolio-links__arrow">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
