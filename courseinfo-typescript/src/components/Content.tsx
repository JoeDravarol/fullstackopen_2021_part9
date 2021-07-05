import React from 'react'

type CourseParts = {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  courseParts: Array<CourseParts>
}

const Content = ({ courseParts }: ContentProps): JSX.Element  => {
  return (
    <>
      {courseParts.map(course => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  )
}

export default Content
