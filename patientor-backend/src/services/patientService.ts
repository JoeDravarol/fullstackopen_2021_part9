import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
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

export default { 
  getEntries,
  getNonSensitiveEntries,
  addEntry
};