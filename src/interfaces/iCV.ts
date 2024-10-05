import dayjs from "dayjs";
import { iJobPlace } from "./iJobPlace";
import { iForeignLangs } from "./iForeignLangs";
import { iUniversities } from "./iUnivercities";

export interface iCV {
    //Main
    imageUrl: string | null,
    firstname: string,
    middlename: string,
    lastname: string,
    city: string,
    age: number | undefined,
    birthdate: dayjs.Dayjs | null,
    sex: string,
    citizenship: string,
    position: string,
    salary: string | null,
    currency: "₽" | "$" | "€",
    about: string,
    //Experience
    haveExperience: boolean,
    jobExperience: iJobPlace[]
    //Education
    level: string,
    nativeLang: string,
    foreignLangs: iForeignLangs[],
    universities: iUniversities[],
}