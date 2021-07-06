import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { OccupationalHealthcareEntry as Entry } from '../types';

interface OccupationalHealthcareEntryProps {
  entry: Entry
}

const OccupationalHealthcareEntry = ({ entry }: OccupationalHealthcareEntryProps) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='stethoscope' />
          {entry.employerName}
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntry;
