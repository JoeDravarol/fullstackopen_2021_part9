const calculateBMI = (height: number, weight: number): number => {
  // Height in cm
  // Weight in kg
  const result = ( (weight / height ** 2) * 10000 ).toFixed(1)
  return Number(result)
}

console.log( calculateBMI(105.4, 16.9) )