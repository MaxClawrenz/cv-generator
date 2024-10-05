export interface iJobPlace {
    name: string,
    jobPosition: string
    startMonth: string,
    startYear: string,
    endMonth: string,
    endYear: string,
    responsibilities: string,
    present: boolean,
    [N: string]: string | number | boolean
}