import React, { useState } from 'react';
import Footer from './footer';
import Navbar from './navbar';

function AdminPage() {
  const [hospitals, setHospitals] = useState([

    {
        id: 1,
        name: 'ABC Hospital',
        address: '123 Main Street',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      },
      {
        id: 2,
        name: 'XYZ Hospital',
        address: '456 Oak Ave',
        city: 'Sometown',
        state: 'CA',
        zip: '67890'
      },



  ]); // array of hospitals
  const [tests, setTests] = useState([]); // array of tests
  const [doctors, setDoctors] = useState([]); // array of doctors
  const [patients, setPatients] = useState([]);

  const handleRemoveHospital = (hospitalId) => {
    const updatedHospitals = hospitals.filter((hospital) => hospital.id !== hospitalId);
    setHospitals(updatedHospitals);
  };

  const handleRemoveTest = (testId) => {
    const updatedTests = tests.filter((test) => test.id !== testId);
    setTests(updatedTests);
  };

  const handleRemoveDoctor = (doctorId) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
    setDoctors(updatedDoctors);
  };
  const handleRemovePatient = (patientId) => {
    const updatedPatients = patients.filter((patient) => patient.id !== patientId);
    setPatients(updatedPatients);
  };

  return (
    <>
    <div className="p-4 sm:ml-64 font-titillium">
        <div className="p-4  rounded-lg dark:border-gray-700">
    <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="block max-w p-6 bg-gradient-120 from-[#18A6F5] to-[#4D43D6] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className=" pb-2 font-bold text-black text-lg">
                Todays Active Appointment
              </div>
              <div className=" pb-2 font-bold text-black text-5xl">30</div>
            </div>

            <div className="block max-w p-6 bg-gradient-120 from-[#F89833] to-[#F2614B] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className=" pb-2 font-bold text-black text-lg">
                Todays Active Report
              </div>
              <div className="pb-2 font-bold text-black text-5xl">45</div>
            </div>

            <div className="block max-w p-6 bg-gradient-120 from-[#7f18f5] to-[#d62ef8] border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className=" pb-2 font-bold text-black text-lg">
                Todays Active Surgery
              </div>
              <div className="pb-2 font-bold text-black text-5xl">15</div>
            </div>
            </div>
    </div>
    </div>
    <div className='container'>
    <iframe
              width="500"
              height="300"
              src="https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjp0cnVlLCJ3LTExIjp0cnVlLCJ3LTEzIjp0cnVlLCJ3LTE0IjpmYWxzZSwidy0xNSI6ZmFsc2UsInctMTEwIjpmYWxzZSwidy13aWR0aC0wIjpmYWxzZSwidy13aWR0aC0xIjp0cnVlLCJ3LXdpZHRoLTIiOmZhbHNlLCJ3LTE2IjoiMjRweCIsInctMTkiOiI0OCIsInctMTciOiIxNiIsInctMjEiOnRydWUsImJnaW1hZ2UiOjAsImJnaW1hZ2VTZXQiOnRydWUsInctMjFjMCI6IiNmZmZmZmYiLCJ3LTAiOnRydWUsInctMyI6ZmFsc2UsInctM2MwIjoiIzM0MzQzNCIsInctM2IwIjoiMSIsInctNiI6IiMzNDM0MzQiLCJ3LTIwIjp0cnVlLCJ3LTQiOiIjMDAwMDAwIiwidy0xOCI6ZmFsc2UsInctd2lkdGgtMmMtMCI6IjUwMCIsInctMTE1IjpmYWxzZX0=&lang=en&cityid=9611"
            ></iframe>
            </div>
    <div className="container" style={{marginTop:"120px"}}>
    <h1>Welcome " " </h1>
      <h2>Remove Hospital</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.city}</td>
              <td>{hospital.state}</td>
              <td>{hospital.zip}</td>
              <td>
                <button onClick={() => handleRemoveHospital(hospital.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Remove Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            {test.name} <button onClick={() => handleRemoveTest(test.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Remove Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            {doctor.name}{' '}
            <button onClick={() => handleRemoveDoctor(doctor.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Remove Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name}{' '}
            <button onClick={() => handleRemovePatient(patient.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
}

export default AdminPage;
