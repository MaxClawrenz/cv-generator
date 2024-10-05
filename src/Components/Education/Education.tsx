import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../../App.css";
import cv from "../../store/cv";
import { observer } from "mobx-react-lite";
import Lang from "./Lang/Lang";
import University from "./University/University";
import { iCV } from "../../interfaces/iCV";
import { useForm } from "react-hook-form";

function Education() {
  const { handleSubmit } = useForm();
  function updateMainInfo(name: keyof iCV, value: string) {
    cv.updateMainInfo(name, value);
  }
  function onSubmit() {
    cv.structureUpdate("step4");
  }

  return (
    <div className="Education">
      <div className="Education-title">Образование</div>
      <form onSubmit={handleSubmit(onSubmit)} className="Education-form">
        <FormControl required>
          <InputLabel size="small" id="demo-simple-select-label">
            Уровень
          </InputLabel>
          <Select
            size="small"
            sx={{ width: "155px" }}
            value={cv.cv.level}
            className="fieldElement"
            labelId="demo-simple-select-label"
            label="Уровень"
            onChange={(event) => updateMainInfo("level", event.target.value)}
          >
            <MenuItem value={"Среднее"}>Среднее</MenuItem>
            <MenuItem value={"Среднее специальное"}>
              Среднее специальное
            </MenuItem>
            <MenuItem value={"Высшее"}>Высшее</MenuItem>
            <MenuItem value={"Магистратура"}>Магистратура</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size="small"
          className="fieldElement"
          required
          label="Родной язык"
          variant="outlined"
          value={cv.cv.nativeLang}
          onChange={(event) => updateMainInfo("nativeLang", event.target.value)}
        />
        {cv.cv.foreignLangs.map((lang, index) => (
          <Lang key={index} index={index} lang={lang} />
        ))}
        {
          <div className="btnBlock">
            <Button
              sx={{ width: "270px" }}
              onClick={() => cv.addLang()}
              variant="contained"
            >
              + Добавить язык
            </Button>
          </div>
        }
        {cv.cv.universities.map((university, index) => (
          <University key={index} index={index} university={university} />
        ))}
        {
          <div className="btnBlock">
            <Button
              sx={{ width: "270px" }}
              onClick={() => cv.addUniversity()}
              variant="contained"
            >
              + Добавить место обучения
            </Button>
          </div>
        }
        {!cv.structure["step4"] && (
          <Button type="submit" variant="contained">
            Далее
          </Button>
        )}
      </form>
    </div>
  );
}

export default observer(Education);
