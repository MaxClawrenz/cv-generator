import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { iUniversities } from "../../../interfaces/iUnivercities";
import { ChangeEvent } from "react";
import cv from "../../../store/cv";
import { observer } from "mobx-react-lite";

function University({
  university,
  index,
}: {
  university: iUniversities;
  index: number;
}) {
  const startYear = 1970;
  const endYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  function updateUniversity(
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) {
    const { name, value } = event.target;
    cv.universityUpdate(index, name as keyof iUniversities, value);
  }

  return (
    <div className="University">
      <TextField
        required
        size="small"
        className="fieldElement"
        label="Название"
        variant="outlined"
        value={university.name}
        name="name"
        onChange={updateUniversity}
      />
      <TextField
        required
        size="small"
        className="fieldElement"
        label="Факультет"
        variant="outlined"
        value={university.faculty}
        name="faculty"
        onChange={updateUniversity}
      />
      <TextField
        required
        size="small"
        className="fieldElement"
        label="Специализация"
        variant="outlined"
        value={university.specialization}
        onChange={updateUniversity}
        name="specialization"
      />
      <FormControl sx={{ width: "180px", marginRight: "14px" }}>
        <InputLabel size="small" required>
          Год окончания
        </InputLabel>
        <Select
          sx={{ width: "180px", marginBottom: "12px" }}
          required
          size="small"
          className="Job-selectDate"
          name="yearEnd"
          labelId="demo-simple-select-label"
          value={university.yearEnd.toString()}
          label="Год окончания"
          onChange={updateUniversity}
        >
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default observer(University);
