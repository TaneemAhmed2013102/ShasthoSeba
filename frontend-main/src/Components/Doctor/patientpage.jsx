// PatientsPage.js
import React, { useState } from 'react';
import Footer from '../footer';

function PatientPage() {
    const [patients, setPatients] = useState([
        {
          id: 1,
          name: 'John Doe',
          age: 30,
          gender: 'Male'
        },
        {
          id: 2,
          name: 'Jane Smith',
          age: 25,
          gender: 'Female'
        }
      ]);
      
      const [tests, setTests] = useState([
        {
          id: 1,
          name: 'Blood Test',
          category: 'Medical',
          result: 'Normal'
        },
        {
          id: 2,
          name: 'X-Ray',
          category: 'Imaging',
          result: 'Abnormal'
        }
      ]);
      
      const handleRemovePatient = (patientId) => {
        setPatients(prevPatients => prevPatients.filter(patient => patient.id !== patientId));
      };
      
      const handleRemoveTest = (testId) => {
        setTests(prevTests => prevTests.filter(test => test.id !== testId));
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
      
      <h2>Remove Tests</h2>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Result</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {tests.map((test) => (
      <tr key={test.id}>
        <td>{test.id}</td>
        <td>{test.name}</td>
        <td>{test.category}</td>
        <td>{test.result}</td>
        <td>
          <button onClick={() => handleRemoveTest(test.id)}>Remove</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      <h2>Remove Patients</h2>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {patients.map((patient) => (
      <tr key={patient.id}>
        <td>{patient.id}</td>
        <td>{patient.name}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>
          <button onClick={() => handleRemovePatient(patient.id)}>Remove</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
    <Footer />
    </>
  );
}

export default PatientPage;