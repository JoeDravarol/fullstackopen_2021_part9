import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient } from "../types";

import Entries from '../components/Entries';
import GenderIcon from '../components/GenderIcon';
import { setPatient, useStateValue } from '../state';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch( setPatient(data) );
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [id, dispatch]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>
          {patient.name}
          <GenderIcon gender={patient.gender} />
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <Entries entries={patient.entries} />
    </>
  );
};

export default PatientInfoPage;
