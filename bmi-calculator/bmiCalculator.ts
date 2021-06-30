const calculateBMI = (height: number, weight: number): number => {
  // Height in cm
  // Weight in kg
  const result = ( (weight / height ** 2) * 10000 ).toFixed(1)
  return Number(result)
}

interface BmiArgs {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BmiArgs => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  const [target, ...dailyExercises] = args.slice(2).map(Number)
  const isDailyExerciseNaN = dailyExercises.some(isNaN)

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
