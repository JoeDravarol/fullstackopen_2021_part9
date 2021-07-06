import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { HealthCheckEntry as Entry } from '../types';

interface HealthCheckEntryProps {
  entry: Entry;
} 

const HealthCheckEntry = ({ entry }: HealthCheckEntryProps) => {
  const heartColors = ['green', 'yellow', 'orange', 'black'];
  const styles = {
    color: heartColors[entry.healthCheckRating]
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='user md' />
        </Card.Header>
        <Card.Description>
          {entry.description}
        </Card.Description>
        <Icon style={styles} name='heart' />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntry;
