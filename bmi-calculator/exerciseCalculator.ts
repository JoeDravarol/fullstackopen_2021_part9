interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: Array<number>, trainingTarget: number): ExerciseResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(Boolean).length;
  
  const totalExerciseHours = dailyExercises.reduce((sum, hour) => sum += hour, 0)
  const average = totalExerciseHours / periodLength

  let result = {
    periodLength,
    trainingDays,
    success: average >= trainingTarget,
    rating: 1,
    ratingDescription: 'More exercise is required',
    target: trainingTarget,
    average
  }

  if (average < trainingTarget) {
    result.rating = 1
    result.ratingDescription = 'More exercise is required'
  } else if (average === trainingTarget) {
    result.rating = 2
    result.ratingDescription = 'Not too bad but could be better'
  } else if (average > trainingTarget) {
    result.rating = 3
    result.ratingDescription = 'Keep up the top performance!'
  }

  return result
}

interface ExerciseArgs {
  target: number
  dailyExercises: Array<number>
}

const parseExerciseArgs = (args: Array<string>): ExerciseArgs => {
  if (args.length < 10) throw new Error('Not enough arguments')
  if (args.length > 10) throw new Error('Too many arguments')

  const [target, ...dailyExercises] = args.slice(2).map(Number)
  const isDailyExerciseNaN = dailyExercises.some(isNaN)

  if ( isNaN(target) || isDailyExerciseNaN ) {
    throw new Error('Provided values were not numbers!')
  }

  return {
    target,
    dailyExercises
  }
}

try {
  const { target, dailyExercises } = parseExerciseArgs(process.argv)
  console.log( calculateExercises(dailyExercises, target) )
} catch (exception) {
  console.error('Error, something went wrong', exception.message)
}