import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

const AboutProject = () => {
  return (
      <section className="about-project" id="about-project">
        <SectionTitle title="О проекте" />

        <ul className="about-project-content">
          <li className="about-project-content__item">
            <h3 className="about-project-content__title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project-content__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project-content__item">
            <h3 className="about-project-content__title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project-content__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>

        <div className="about-project-chart">
          <div className="about-project-chart__part about-project-chart__part--green">1 неделя</div>
          <div className="about-project-chart__part about-project-chart__part--gray">4 недели</div>
          <div className="about-project-chart__text">Back&#8209;end</div>
          <div className="about-project-chart__text">Front&#8209;end</div>
        </div>
      </section>
  );
}

export default AboutProject;
