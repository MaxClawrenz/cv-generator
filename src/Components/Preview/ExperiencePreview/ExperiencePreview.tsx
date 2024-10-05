import { observer } from "mobx-react-lite";
import { iJobPlace } from "../../../interfaces/iJobPlace";

function ExperiencePreview({ job }: { job: iJobPlace }) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return (
    <div className="ExperiencePreview">
      <div className="ExperiencePreview-header">
        <div className="ExperiencePreview-dates">
          {`${months[Number(job.startMonth) - 1]} ${job.startYear} – `}
          {job.present
            ? "по настоящее время"
            : `${months[Number(job.endMonth) - 1]} ${job.endYear}`}
        </div>
      </div>
      <div className="ExperiencePreview-list">
        <div className="ExperiencePreview-jobname">{job.name}</div>
        <div className="ExperiencePreview-responsibilities">
          {job.responsibilities}
        </div>
      </div>
    </div>
  );
}

export default observer(ExperiencePreview);
