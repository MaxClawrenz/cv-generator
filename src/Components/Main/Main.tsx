import "../../App.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import cv from "../../store/cv";
import { observer } from "mobx-react-lite";
import { Dayjs } from "dayjs";
import { iCV } from "../../interfaces/iCV";
import { useForm, Controller } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent } from "react";
import Avatar from "./Avatar/Avatar";

function Main() {
  const { handleSubmit, control } = useForm();

  function updateMainInfo(
    name: keyof iCV,
    value: string | Dayjs | null | number
  ) {
    cv.updateMainInfo(name, value);
  }
  function onSubmit() {
    cv.structureUpdate("step2");
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        cv.addPhoto(fileReader.result as string);
      };

      fileReader.readAsDataURL(file);
    }
  }

  return (
    <div className="Main">
      <div className="Main-title">Основная информация</div>
      <form onSubmit={handleSubmit(onSubmit)} className="Main-form">
        <div className="Main-topBlock">
          <div className="Main-topBlock-pictBlock">
            <div className="pictPreview">
              <Avatar />
            </div>
            <div className="pictInstruments">
              {!cv.cv.imageUrl && (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Загрузить
                  <input
                    onChange={handleImageUpload}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                </Button>
              )}
              {cv.cv.imageUrl && (
                <Button
                  onClick={() => cv.deletePhoto()}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Удалить
                </Button>
              )}
            </div>
          </div>
          <div className="Main-topBlock-info">
            <TextField
              required
              size="small"
              className="fieldElement"
              label="Фамилия"
              variant="outlined"
              value={cv.cv.lastname}
              name="lastname"
              onChange={(event) =>
                updateMainInfo("lastname", event.target.value)
              }
            />
            <TextField
              required
              size="small"
              className="fieldElement"
              label="Имя"
              variant="outlined"
              value={cv.cv.firstname}
              name="firstname"
              onChange={(event) =>
                updateMainInfo("firstname", event.target.value)
              }
            />
            <TextField
              size="small"
              value={cv.cv.middlename}
              className="fieldElement"
              label="Отчество"
              variant="outlined"
              name="middlename"
              onChange={(event) =>
                updateMainInfo("middlename", event.target.value)
              }
            />

            <TextField
              size="small"
              className="fieldElement"
              label="Город проживания"
              required
              variant="outlined"
              value={cv.cv.city}
              name="city"
              onChange={(event) => updateMainInfo("city", event.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="birthdate"
                control={control}
                rules={{ required: "Дата рождения обязательна" }}
                render={({ field }) => (
                  <DateField
                    size="small"
                    className="fieldElement"
                    label="Дата рождения"
                    required
                    {...field}
                    value={cv.cv.birthdate}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      updateMainInfo("birthdate", newValue);
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <FormControl>
              <InputLabel size="small" id="demo-simple-select-label">
                Пол
              </InputLabel>
              <Controller
                defaultValue={cv.cv.sex}
                name="sex"
                control={control}
                render={({ field }) => (
                  <Select
                    size="small"
                    className="fieldElement"
                    labelId="demo-simple-select-label"
                    label="Пол"
                    {...field}
                    value={cv.cv.sex}
                    onChange={(event) =>
                      updateMainInfo("sex", event.target.value)
                    }
                  >
                    <MenuItem value={"M"}>Мужской</MenuItem>
                    <MenuItem value={"F"}>Женский</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>

        <TextField
          size="small"
          className="fieldElement"
          label="Гражданство"
          required
          variant="outlined"
          value={cv.cv.citizenship}
          name="citizenship"
          onChange={(event) =>
            updateMainInfo("citizenship", event.target.value)
          }
        />

        <TextField
          size="small"
          className="fieldElement"
          label="Желаемая должность"
          required
          variant="outlined"
          value={cv.cv.position}
          name="position"
          onChange={(event) => updateMainInfo("position", event.target.value)}
        />
        <div className="field-group">
          <TextField
            size="small"
            sx={{ marginRight: "14px", width: "30%" }}
            className="fieldElement"
            type="number"
            label="Зарплата"
            required
            variant="outlined"
            value={cv.cv.salary}
            name="salary"
            onChange={(event) => updateMainInfo("salary", event.target.value)}
          />
          <FormControl>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  size="small"
                  className="fieldElement"
                  {...field}
                  value={cv.cv.currency}
                  onChange={(event) => {
                    field.onChange(event.target.value);
                    updateMainInfo("currency", event.target.value);
                  }}
                >
                  <MenuItem value={"₽"}>₽</MenuItem>
                  <MenuItem value={"$"}>$</MenuItem>
                  <MenuItem value={"€"}>€</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </div>

        <TextField
          size="small"
          className="fieldElement"
          multiline
          rows={5}
          label="О себе"
          variant="outlined"
          value={cv.cv.about}
          name="about"
          onChange={(event) => updateMainInfo("about", event.target.value)}
        />
        {!cv.structure["step2"] && (
          <Button type="submit" variant="contained">
            Далее
          </Button>
        )}
      </form>
    </div>
  );
}

export default observer(Main);
