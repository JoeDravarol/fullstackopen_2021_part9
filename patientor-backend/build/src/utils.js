"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDOB(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newEntry;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Invalid or missing name');
    }
    return name;
};
const parseDOB = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid or missing date: ' + date);
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Invalid or missing ssn');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Invalid or missing gender ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid or missing occupation');
    }
    return occupation;
};
exports.default = toNewPatientEntry;
