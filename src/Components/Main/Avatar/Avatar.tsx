import { observer } from "mobx-react-lite";
import cv from "../../../store/cv";

function Avatar() {
  return (
    <div className="Avatar">
      {cv.cv.imageUrl ? (
        <img className="Avatar-img" alt="avatar" src={cv.cv.imageUrl} />
      ) : (
        <div className="Avatar-nopict">?</div>
      )}
    </div>
  );
}

export default observer(Avatar);
