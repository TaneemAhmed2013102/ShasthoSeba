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

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/patients/:doctor/:department" element={<PatientsList />} />
      <Route path="/post/patient" element={<SelectDeptDoctor />} />
      <Route path="/appoint" element={<Appoint />} />
      <Route path="/verifyemail/:verifyToken" element={<VerifyEmail />} />
    </Routes>
  </BrowserRouter>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
