import express from 'express';
import { toNewPatientEntry, toNewEntry } from '../utils';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send( patientService.getNonSensitiveEntries() );
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const result = patientService.findPatient(id);
  res.status(200).json(result);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry({ ...req.body, entries: [] });

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.findPatient(id);
    const newEntry = toNewEntry({ ...req.body });

    if (patient && newEntry) {
      const addedEntry = patientService.addPatientEntry(patient, newEntry);
      res.status(201).json(addedEntry);
    }
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

export default router;