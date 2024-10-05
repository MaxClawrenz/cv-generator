import { observer } from "mobx-react-lite";
import { iForeignLangs } from "../../../interfaces/iForeignLangs";

function LangPreview({ lang }: { lang: iForeignLangs }) {
  return (
    <div className="mainBlock">
      <div className="mainTitle">Доп. язык: </div>
      <div className="mainValue">{`${lang.name} (${lang.level})`}</div>
    </div>
  );
}

export default observer(LangPreview);
