import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import "../../../App.css";
import { iJobPlace } from "../../../interfaces/iJobPlace";
import { observer } from "mobx-react-lite";
import cv from "../../../store/cv";
import { ChangeEvent } from "react";

function Job({ job, index }: { job: iJobPlace; index: number }) {
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
  const startYear = 1970;
  const endYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  function updateJob(
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      | SelectChangeEvent<string>
  ) {
    const { name, value } = event.target;
    cv.jobUpdate(index, name, value);
  }

  return (
    <div className="Job">
      <TextField
        size="small"
        className="fieldElement"
        required
        name="name"
        label="Компания"
        variant="outlined"
        value={job.name}
        onChange={updateJob}
      />
      <TextField
        size="small"
        required
        className="fieldElement"
        name="jobPosition"
        label="Должность"
        variant="outlined"
        value={job.jobPosition}
        onChange={updateJob}
      />
      <TextField
        size="small"
        className="fieldElement"
        name="responsibilities"
        label="Обязанности"
        multiline
        rows={4}
        variant="outlined"
        value={job.responsibilities}
        onChange={updateJob}
      />

      <div className="Job-selectGroup">
        <FormControl required>
          <InputLabel size="small" id={`startMonth-${index}`}>
            Месяц
          </InputLabel>
          <Select
            size="small"
            className="Job-selectDate"
            labelId={`startMonth-${index}`}
            value={job.startMonth}
            label="startMonth"
            onChange={updateJob}
            name="startMonth"
          >
            {months.map((month, monthIndex) => (
              <MenuItem value={(monthIndex + 1).toString()}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl required sx={{ width: 150, marginRight: "14px" }}>
          <InputLabel size="small" required id={`startYear-${index}`}>
            Год
          </InputLabel>
          <Select
            size="small"
            required
            className="Job-selectDate"
            labelId={`startYear-${index}`}
            value={job.startYear}
            label="startYear"
            onChange={updateJob}
            name="startYear"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="Job-selectGroup">
        <FormControl
          required={!job.present}
          sx={{ width: 150, marginRight: "14px", marginBottom: 0 }}
        >
          <InputLabel
            size="small"
            required={!job.present}
            id={`endMonth-${index}`}
          >
            Месяц
          </InputLabel>
          <Select
            size="small"
            required={!job.present}
            className="Job-selectDate"
            name="endMonth"
            onChange={updateJob}
            labelId={`endMonth-${index}`}
            value={job.endMonth}
            label="endMonth"
            disabled={job.present}
          >
            {months.map((month, monthIndex) => (
              <MenuItem key={monthIndex} value={monthIndex + 1}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          required={!job.present}
          sx={{ width: 150, marginRight: "14px", marginBottom: 0 }}
        >
          <InputLabel
            size="small"
            required={!job.present}
            id={`endYear-${index}`}
          >
            Год
          </InputLabel>
          <Select
            size="small"
            required={!job.present}
            className="Job-selectDate"
            name="endYear"
            onChange={updateJob}
            labelId={`endYear-${index}`}
            value={job.endYear}
            disabled={job.present}
            label="startMonth"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          className="Job-isWorking-checkbox"
          control={
            <Checkbox
              size="small"
              onChange={(event) => cv.isWorking(event, index)}
            />
          }
          label="Ещё работаю"
        />
      </div>
    </div>
  );
}

export default observer(Job);
