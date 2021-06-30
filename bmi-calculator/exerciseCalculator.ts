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

console.log( calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2) )