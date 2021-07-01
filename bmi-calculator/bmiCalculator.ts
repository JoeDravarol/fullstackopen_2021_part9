export const calculateBMI = (height: number, weight: number): string => {
  // Height in cm
  // Weight in kg
  const result = Number( ( (weight / height ** 2) * 10000 ).toFixed(1) )

  if (result < 18.5) {
    return 'Underweight'
  } else if (result >= 18.5 && result < 25) {
    return 'Normal (healthy weight)'
  } else if (result >= 25 && result < 30) {
    return 'Overweight'
  }
  
  return 'obese'
}

interface BmiArgs {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log( calculateBMI(height, weight) )
} catch (exception) {
  console.error('Error, something went wrong', exception.message)
}
