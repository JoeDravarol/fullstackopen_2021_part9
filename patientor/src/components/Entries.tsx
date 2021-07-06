import React from 'react';
import { Entry as EntryType, Diagnosis } from '../types';
import { useStateValue } from '../state';

interface EntryProps {
  entry: EntryType
}

const Entry = ({ entry }: EntryProps) => {
  const diagnosisCodes: Array<Diagnosis['code']> | undefined = entry.diagnosisCodes;
  const [{ diagnoses }] = useStateValue();

  return (
    <div>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {diagnosisCodes?.map((code:  Diagnosis['code']) =>
          <li key={entry.id + code}>
            {code} {diagnoses.find(diagnose => diagnose.code === code)?.name}
          </li>
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
