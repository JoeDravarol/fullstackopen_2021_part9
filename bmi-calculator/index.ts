import express from 'express'

import { calculateBMI } from './bmiCalculator'

const app =  express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight) {
    return res.status(400).send({ error: 'malformatted parameters' })
  }

  const bmi = calculateBMI(height, weight)
  
  const result = { 
    height,
    weight,
    bmi
  }
  
  return res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Severing running on port ${PORT}`)
})