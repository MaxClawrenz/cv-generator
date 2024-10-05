import { makeAutoObservable, runInAction } from "mobx";
import { iCV } from "../interfaces/iCV";
import { iJobPlace } from "../interfaces/iJobPlace";
import { ChangeEvent } from "react";
import { iForeignLangs } from "../interfaces/iForeignLangs";
import { iUniversities } from "../interfaces/iUnivercities";
import { iStructure } from "../interfaces/iStructure";

class CV {

    jobExperience: iJobPlace[] = [];
    foreignLangs: iForeignLangs[] = [];
    universities: iUniversities[] = [];
    structure: iStructure = {
        step1: true,
        step2: false,
        step3: false,
        step4: false
    }
    
    cv: iCV = {
        imageUrl: null,
        firstname: "",
        middlename: "",
        lastname: "",
        city: "",
        birthdate: null,
        age: undefined,
        sex: "",
        citizenship: "",
        position: "",
        salary: null,
        currency: "₽",
        about: "",
        haveExperience: false,
        jobExperience: this.jobExperience,
        level: "",
        nativeLang: "",
        foreignLangs: this.foreignLangs,
        universities: this.universities
    }

    constructor(){
        makeAutoObservable(this);
    }
    //свитчер наличия опыта
    haveExperienceChange(value: boolean){
        runInAction(() => {
            this.cv.haveExperience = value;
            if(!value) this.cv.jobExperience.length = 0;
            if(value) this.addJob();
        })
    }

    //добавление компании в опыт
    addJob(){
        runInAction(() => {
            this.cv.jobExperience.push({
                name: "",
                jobPosition: "",
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                responsibilities: "",
                present: false
            })
        })
    }

    //отключение даты окончания работы
    isWorking(event: ChangeEvent<HTMLInputElement>, index: number){
        runInAction(() => {
            this.cv.jobExperience[index].present = event.target.checked;
        })
    }

    //обновление данных по прошлым местам работы
    jobUpdate(index: number, key: keyof iJobPlace, value: string | number | boolean){
        runInAction(() => {
            this.cv.jobExperience[index][key] = value;
        })
    }

    //добавление языка
    addLang(){
        runInAction(() => {
            this.cv.foreignLangs.push({
                name: "",
                level: "A1"
            })
        })
    }
    //обновление данных по добавленным языкам
    langUpdate<K extends keyof iForeignLangs>(index: number, key: K, value: iForeignLangs[K] ){
        runInAction(() => {
            this.cv.foreignLangs[index][key] = value;
        })
    }

    //добавление места обучения
    addUniversity(){
        runInAction(() => {
            this.cv.universities.push({
                name: "",
                faculty: "",
                specialization: "",
                yearEnd: ""
            })
        })
    }
    //обновление данных по местам обучения
    universityUpdate<K extends keyof iUniversities>(index: number, key: K, value: iUniversities[K] ){
        runInAction(() => {
            this.cv.universities[index][key] = value;
        })
    }
    //обновление основной информации
    updateMainInfo<K extends keyof iCV>(key: K, value: iCV[K]){
        runInAction(() => {
            this.cv[key] = value;
        })
    }

    //метод обновления доступа к разделам cv
    structureUpdate(step: string){
        console.log(this.structure)
        runInAction(() => {
            this.structure[step] = true;
        })
    }

    //добавляет фото
    addPhoto(url: string){
        this.cv.imageUrl = url;
    }

    //удаляет фото
    deletePhoto(){
        this.cv.imageUrl = null;
    }

}

export default new CV()