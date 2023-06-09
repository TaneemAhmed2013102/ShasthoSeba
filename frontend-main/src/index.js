import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Components/home';
import Login from './Components/login';
import Register from './Components/register';
import VerifyEmail from './Components/verify_email';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Dashboard from './Components/dashboard';
import AdminPage from './Components/admin';
import Appoint from './Components/appoint';
import SelectDeptDoctor from './Components/selectDept';
import PatientsList from './Components/patientslist';
import Doctor from './Components/doctors';
import Description from './Components/appoints_description';
import Patients from './Components/patients';
import LoginPage from './Components/hdplogin';
import PatLogin from './Components/Patient/patlogin';
import PatRegister from './Components/Patient/patientReg';
import Prescription from './Components/Patient/prescription';
import Reports from './Components/Patient/reports';
import PatDashboard from './Components/Patient/patientDash';
import DocLogin from './Components/Doctor/doclogin';
import DocRegister from './Components/Doctor/docreg';
import DocDash from './Components/Doctor/docdash';
import Scheduler from './Components/Doctor/scheduler';
import DocDashboard from './Components/Doctor/docdash2';
import PatientPage from './Components/Doctor/patientpage';
import TakeAppoint from './Components/Patient/takeappoint';
import SelectDeptDoctorforPatient from './Components/Patient/postPatient';
import PatList from './Components/Patient/appointslist';
import PatNavbar from './Components/Patient/patnav';
import PatDoctor from './Components/Patient/doctorsforpat';
import PatDescription from './Components/Patient/description';
import Hospital from './Components/hospitals';
import DocNavbar from './Components/Doctor/docnav';
import DocAppointments from './Components/Doctor/myappointments';
import Lesgoo from './Components/united';
import DoctReport from './Components/Doctor/DoctReport';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Patient/patlogin" element={<PatLogin />} />
      <Route path="/Patient/patientReg" element={<PatRegister />} />
      <Route path="/Patient/prescription" element={<Prescription />} />
      <Route path="/Patient/reports" element={<Reports />} />
      <Route path="/Patient/patientDash" element={<PatDashboard />} />
      <Route path="/Patient/taekappoint" element={<TakeAppoint />} />
      <Route path="/Patient/postpatient" element={<SelectDeptDoctorforPatient />} />
      <Route path="/Patients/patportal/:doctor/:department" element={<PatList />} />
      <Route path="/Patient/patnav" element={<PatNavbar />} />
      <Route path="/Patient/doctorsforpat" element={<PatDoctor />} />
      <Route path="/patPortal/:postToken" element={<PatDescription />} />
      <Route path="/Doctor/doclogin" element={<DocLogin />} />
      <Route path="/Doctor/docreg" element={<DocRegister />} />
      <Route path="/Doctor/docdash" element={<DocDash />} />
      <Route path="/Doctor/docdash2" element={<DocDashboard />} />
      <Route path="/Doctor/scheduler" element={<Scheduler />} />
      <Route path="/Doctor/patientpage" element={<PatientPage />} />
      <Route path="/Doctor/docnav" element={<DocNavbar />} />
      <Route path="/Doctor/myappointments" element={<DocAppointments />} />
      <Route path="/Doctor/DoctReport" element={<DoctReport />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctors" element={<Doctor />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/hospitals" element={<Hospital />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/hdplogin" element={<LoginPage />} />
      <Route path="/patients/:doctor/:department" element={<PatientsList />} />
      <Route path="/post/patient" element={<SelectDeptDoctor />} />
      <Route path="/details/:postToken" element={<Description />} />
      <Route path="/appoint" element={<Appoint />} />
      <Route path="/verifyemail/:verifyToken" element={<VerifyEmail />} />
      <Route path="/united" element={<Lesgoo />} />
    </Routes>
  </BrowserRouter>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
