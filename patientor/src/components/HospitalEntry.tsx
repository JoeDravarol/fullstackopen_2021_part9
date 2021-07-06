import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HospitalEntry as Entry } from '../types';

interface HospitalEntryProps {
  entry: Entry
}

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='hospital outline' />
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>

        <Card.Description extra>
          <h4>Discharge</h4>
          date: {entry.discharge.date} <br/>
          criteria: {entry.discharge.criteria}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
