import { observer } from "mobx-react-lite";
import { iUniversities } from "../../../interfaces/iUnivercities";

function EducationPreview({ university }: { university: iUniversities }) {
  return (
    <div className="ExperiencePreview">
      <div className="ExperiencePreview-header">
        <div className="ExperiencePreview-dates">
          {`${university.yearEnd} – ${university.name}`}
        </div>
      </div>
      <div className="ExperiencePreview-list">
        <div className="ExperiencePreview-jobname">{university.faculty}</div>
        <div className="ExperiencePreview-responsibilities">
          {university.specialization}
        </div>
      </div>
    </div>
  );
}

export default observer(EducationPreview);
