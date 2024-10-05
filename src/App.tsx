import { observer } from "mobx-react-lite";
import "./App.css";
import Education from "./Components/Education/Education";
import Experience from "./Components/Experience/Experience";
import Main from "./Components/Main/Main";
import Preview from "./Components/Preview/Preview";
import cv from "./store/cv";

function App() {
  return (
    <div className="App">
      <header className="App-header">CV Creator</header>
      <Main />
      {cv.structure["step2"] && <Experience />}
      {cv.structure["step3"] && <Education />}
      {cv.structure["step4"] && <Preview />}
    </div>
  );
}

export default observer(App);
