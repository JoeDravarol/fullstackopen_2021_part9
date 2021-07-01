export const calculateBMI = (height: number, weight: number): string => {
  // Height in cm
  // Weight in kg
  const result = Number( ( (weight / height ** 2) * 10000 ).toFixed(1) );

  if (result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result < 25) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result < 30) {
    return 'Overweight';
  }
  
  return 'obese';
};