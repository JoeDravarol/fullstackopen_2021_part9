import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, PublicPatient, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();

  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatient = (id: string): PatientEntry | undefined => {
  return patients.find(patient => patient.id === id);
};

export default { 
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findPatient
};