import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, PublicPatient, NewPatientEntry, EntryWithoutId } from '../types';

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
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

const addPatientEntry = (patient: PatientEntry, entry: EntryWithoutId): PatientEntry => {
  const id: string = uuid();

  const newEntry = {
    id,
    ...entry,
  };
  
  patient.entries = patient.entries.concat(newEntry);

  return patient;
};

export default { 
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findPatient,
  addPatientEntry
};