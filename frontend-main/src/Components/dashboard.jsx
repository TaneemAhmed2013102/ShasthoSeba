import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../links";
import { Navigate } from "react-router-dom";
import HOSNavbar from "./hospitalNav";

const Dashboard = () => {

  const [details, setDetails] = useState({});
  const userToken = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userSessionToken");
    setDetails({});
  };

  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
    <HOSNavbar />
    <div className="dashboard" style={{marginTop:"100px"}}>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="card">
          <h2>Total Patients</h2>
          <p>500</p>
        </div>
        <div className="card">
          <h2>Total Doctors</h2>
          <p>50</p>
        </div>
        <div className="card">
          <h2>Total Appointments</h2>
          <p>1000</p>
        </div>
        <div className="card">
          <h2>Total Revenue</h2>
          <p>$500,000</p>
        </div>
      </div>
      <div className="row">
        <div className="chart">
          <h2>Patients by Department</h2>
          <img src="patients-by-department-chart.png" alt="Patients by Department Chart" />
        </div>
        <div className="chart">
          <h2>Appointments by Day</h2>
          <img src="appointments-by-day-chart.png" alt="Appointments by Day Chart" />
        </div>
        <div className="d-grid">
              <button
                onClick={(event) => {
                  handleLogout();
                }}
                type="button"
                className="d-block btn btn-danger mt-5"
              >
                Log Out
              </button>
            </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
