import { 
  NewPatientEntry, Gender, Entry,
  DiagnoseEntry, Discharge, SickLeave, 
  HealthCheckRating, NewEntry
} from './types';

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown[]
};

export const toNewPatientEntry = ({
  name, dateOfBirth, ssn, gender, occupation, entries
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (newEntry: any): NewEntry => {
  // Check if newEntry has a valid type
  const validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Entry not valid");

  const entry: Omit<NewEntry, 'id' | 'type'> = {
    description: parseDescription(validEntryType.description),
    date: parseDate(validEntryType.date),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCodes(validEntryType.diagnosisCodes)
  };

  switch (validEntryType.type) {
    case 'Hospital':
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge)
      };
    case 'HealthCheck':
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHeathlCheckRating(validEntryType.healthCheckRating)
      };
    case 'OccupationalHealthcare':
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseEmployerName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave)
      };
    default:
      return assertNever(validEntryType);
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArray = (param: any): boolean => {
  return param.constructor === Array;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (param: any): boolean => {
  return isEntryType(param.type);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is NewEntry => {
  return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Invalid or missing name');
  }
  return name;
};

const parseDOB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Invalid or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Invalid or missing gender ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Invalid or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown[]): Entry[] => {
  if (
    !entries || !isArray(entries) || !entries.some((entry: unknown) => isEntry(entry))
  ) {
    throw new Error('Invalid or missing entries');
  }
  return entries as Entry[];
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error('Invalid or missing description');
  }
  return desc;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Invalid or missing date: ' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Invalid or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown[] | undefined): Array<DiagnoseEntry['code']> => {
  if (
    !diagnosisCodes || !isArray(diagnosisCodes) || !diagnosisCodes.every((code: unknown) => isString(code))
  ) {
    throw new Error('Invalid or missing diagnosisCodes');
  }
  return diagnosisCodes as Array<DiagnoseEntry['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge || !discharge.date || !discharge.criteria ||
    !isDate(discharge.date) || !isString(discharge.criteria)
  ) {
    throw new Error(`Invalid or missing discharge date or criteria: ${discharge}`);
  }

  return discharge as Discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Invalid or missing employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return;

  if (
    !sickLeave.startDate || !sickLeave.endDate ||
    !isString(sickLeave.startDate) || !isString(sickLeave.endDate)
  ) {
    throw new Error(`Invalid or missing sickLeave startDate or endDate: ${sickLeave}`);
  }

  return sickLeave as SickLeave;
};

const parseHeathlCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Invalid or missing rating ' + rating);
  }
  return rating;
};

const parseEntry = (entry: unknown): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error('Invalid or missing entry');
  }
  return entry as NewEntry;
};

// Helper function for exhaustive type checking
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};