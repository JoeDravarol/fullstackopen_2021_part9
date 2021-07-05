import React from 'react'
import Part from './Part'
import { CoursePart } from '../helpers/types'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps): JSX.Element  => {
  return (
    <>
      {courseParts.map(course => (
        <Part key={course.name} part={course} />
      ))}
    </>
  )
}

export default Content
