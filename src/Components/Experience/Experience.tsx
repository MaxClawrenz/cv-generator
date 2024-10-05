import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "../../App.css";
import cv from "../../store/cv";
import { observer } from "mobx-react-lite";
import Job from "./Job/Job";
import { useForm } from "react-hook-form";

function Experience() {
  const { handleSubmit } = useForm();

  function onSubmit() {
    cv.structureUpdate("step3");
  }

  return (
    <div className="Experience">
      <div className="Experience-title">Опыт работы</div>
      <form onSubmit={handleSubmit(onSubmit)} className="Experience-form">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Есть опыт работы?
          </FormLabel>
          <RadioGroup
            onChange={(event) =>
              cv.haveExperienceChange(event.target.value === "true")
            }
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={cv.cv.haveExperience}
            name="radio-buttons-group"
          >
            <FormControlLabel value={false} control={<Radio />} label="Нет" />
            <FormControlLabel value={true} control={<Radio />} label="Есть" />
          </RadioGroup>
        </FormControl>

        {cv.cv.haveExperience &&
          cv.cv.jobExperience.map((job, index) => (
            <Job key={index} index={index} job={job} />
          ))}

        {cv.cv.haveExperience && (
          <div className="btnBlock">
            <Button
              sx={{ width: "270px" }}
              onClick={() => cv.addJob()}
              variant="contained"
            >
              + Добавить компанию
            </Button>
          </div>
        )}

        {!cv.structure["step3"] && (
          <Button type="submit" variant="contained">
            Далее
          </Button>
        )}
      </form>
    </div>
  );
}

export default observer(Experience);
