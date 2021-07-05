import React from 'react'
import { assertNever } from '../helpers/utils'
import { CoursePart } from '../helpers/types'

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>
            <em>{part.description}</em>
          </p>
          <p>Submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>
            <em>{part.description}</em>
          </p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
}
export default Part
