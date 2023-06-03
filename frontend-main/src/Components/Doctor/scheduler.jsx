import React, { useState } from 'react';

import Navbar from '../navbar';
import Footer from '../footer';

const Scheduler = () => {
  const [patients, setPatients] = useState([]);

  const addPatient = (patient) => {
    setPatients([...patients, patient]);
  };

  return (
    <>
    <Navbar />
    <div className="scheduler-container" style={{marginTop:"130px"}}>
      <h1 className="scheduler-heading">Patient Scheduler</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const patientName = e.target.elements.patientName.value;
          const appointmentTime = e.target.elements.appointmentTime.value;
          addPatient({ name: patientName, time: appointmentTime });
          e.target.reset();
        }}
      >
        <br></br><br></br><br></br><br></br>
        <input type="text" name="patientName" placeholder="Patient Name" required className="scheduler-input" />
        <input type="number" name="patientId" placeholder="Patient ID" required className="scheduler-input" />
        <input type="time" name="appointmentTime" placeholder="Appointment time" required className="scheduler-input" /><br></br><br></br><br></br><br></br><br></br><br></br>
        <button type="submit" className="scheduler-button">Add Patient</button>
      </form>
      <ul className="scheduler-list">
        {patients.map((patient, index) => (
          <li key={index} className="scheduler-list-item">
            <span className="scheduler-patient">{patient.name}</span> - <span className="scheduler-time">{patient.time}</span>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
};

export default Scheduler;
