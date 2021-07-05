import React from 'react'

type CourseParts = {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: Array<CourseParts>
}

const Total = ({ courseParts }: TotalProps): JSX.Element  => {
  return (
    <p>
      Number of exercises:
      {courseParts.reduce((total, part) => total += part.exerciseCount, 0)}
    </p>
  )
}

export default Total
