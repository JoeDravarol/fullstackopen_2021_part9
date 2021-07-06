import React from 'react';
import { Entry as EntryType, Diagnosis } from '../types';

interface EntryProps {
  entry: EntryType
}

const Entry = ({ entry }: EntryProps) => {
  const diagnosisCodes: Array<Diagnosis['code']> | undefined = entry.diagnosisCodes;

  return (
    <div>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {diagnosisCodes?.map((code:  Diagnosis['code']) =>
          <li key={entry.id + code}>{code}</li>
        )}
      </ul>
    </div>
  );
};

interface EntriesProps {
  entries: EntryType[]
}

const Entries = ({ entries }: EntriesProps) => {

  return (
    <div>
      <h3>entries</h3>
      
      {entries.length === 0 && <p>No entries</p>}
  
      {entries.map(entry => 
        <Entry key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default Entries;
