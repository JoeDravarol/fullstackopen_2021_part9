import express from 'express';
import toNewPatientEntry from '../utils';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send( patientService.getNonSensitiveEntries() );
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});

export default router;