import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { iForeignLangs } from "../../../interfaces/iForeignLangs";
import { ChangeEvent } from "react";
import cv from "../../../store/cv";
import { observer } from "mobx-react-lite";

function Lang({ lang, index }: { lang: iForeignLangs; index: number }) {
  function updateLang(
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) {
    const { name, value } = event.target;
    cv.langUpdate(index, name as keyof iForeignLangs, value);
  }
  return (
    <div className="Lang">
      <TextField
        sx={{ width: "80%" }}
        size="small"
        className="fieldElement"
        required
        label="Язык"
        variant="outlined"
        value={lang.name}
        onChange={updateLang}
        name="name"
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Уровень</InputLabel>
        <Select
          sx={{ width: "100px" }}
          size="small"
          value={lang.level}
          className="fieldElement"
          labelId="demo-simple-select-label"
          label="Уровень"
          name="level"
          onChange={(event) => updateLang(event)}
        >
          <MenuItem value={"A1"}>A1</MenuItem>
          <MenuItem value={"A2"}>A2</MenuItem>
          <MenuItem value={"B1"}>B1</MenuItem>
          <MenuItem value={"B2"}>B2</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default observer(Lang);
