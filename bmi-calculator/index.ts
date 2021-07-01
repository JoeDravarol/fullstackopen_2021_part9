import express from 'express';

import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app =  express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBMI(height, weight);
  
  const result = { 
    height,
    weight,
    bmi
  };
  
  return res.json(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if ( !(daily_exercises instanceof Array) || isNaN(target) ) {
    return res.status(400).send({ error: 'malformatted parameters'} );
  }

  const result = calculateExercises(daily_exercises, Number(target));

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Severing running on port ${PORT}`);
});