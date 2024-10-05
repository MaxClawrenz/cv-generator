import { observer } from "mobx-react-lite";
import "../../App.css";
import cv from "../../store/cv";
import ExperienceJob from "./ExperiencePreview/ExperiencePreview";
import EducationPreview from "./EducationPreview/EducationPreview";
import LangPreview from "./LangPreview/LangPreview";

function Preview() {
  return (
    <div className="Preview">
      <div className="Preview-title">Обзор</div>
      <div className="Preview-cv">
        <div className="Preview-cv-main">
          <div className="Preview-photo">
            {cv.cv.imageUrl && (
              <img
                className="Preview-avatar"
                alt="avatar"
                width={300}
                src={cv.cv.imageUrl}
              />
            )}
          </div>
          <div className="Preview-info">
            <div className="Preview-fioblock">
              <div className="Preview-fio">{cv.cv.lastname}</div>
              <div className="Preview-fio">{cv.cv.firstname}</div>
              <div className="Preview-fio">{cv.cv.middlename}</div>
            </div>
            <div className="Preview-block">
              {cv.cv.birthdate?.format("DD.MM.YYYY")}
            </div>
            <div className="Preview-block">{cv.cv.city}</div>

            <div className="positionBlock">
              <div className="positionTitle">Желаемая должность</div>
              <div className="position">{cv.cv.position}</div>
            </div>

            <div className="salaryBlock">
              <div className="salaryTitle">Зарплатные ожидания</div>
              <div className="salary">{`${cv.cv.salary} ${cv.cv.currency}`}</div>
            </div>
          </div>
        </div>
        <div className="mainBlock">
          <div className="mainTitle">Пол: </div>
          <div className="mainValue">
            {cv.cv.sex === "M" ? "Мужчина" : "Женщина"}
          </div>
        </div>
        <div className="mainBlock">
          <div className="mainTitle">Гражданство: </div>
          <div className="mainValue">{cv.cv.citizenship}</div>
        </div>
        <div className="mainBlock">
          <div className="mainTitle">О себе: </div>
          <div className="mainValue">{cv.cv.about}</div>
        </div>

        <div className="Preview-cv-experience">
          <span className="experienceTitle">Опыт работы</span>
          {cv.cv.jobExperience.map((job) => (
            <ExperienceJob job={job} />
          ))}
        </div>
        <div className="Preview-cv-education">
          <div className="mainBlock">
            <div className="mainTitle">Образование: </div>
            <div className="mainValue">{cv.cv.level}</div>
          </div>
          <div className="mainBlock">
            <div className="mainTitle">Родной язык: </div>
            <div className="mainValue">{cv.cv.nativeLang}</div>
          </div>

          {cv.cv.foreignLangs.map((lang) => (
            <LangPreview lang={lang} />
          ))}
          <div className="Preview-cv-experience">
            <span className="experienceTitle">Образование</span>
            {cv.cv.universities.map((university) => (
              <EducationPreview university={university} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Preview);
