import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PatDashboard = () => {

const[details, setDetails] = useState({});
const userToken = localStorage.getItem("userToken");

const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userSessionToken");
    setDetails({});
    //console.log('handle');
};

if (!userToken) {
    return <Navigate to="/" replace />;
}

return(
    <>
    <div class="sidebarpat">
    <a className="navbar-brand text-light" href="/Patient/patientDash"><b><i>
          <h4>ShasthoSeba</h4>
          </i>
          </b>
        </a>
    <img className="patientimg"
              src={require("../../Photos/patient.jpg")}
              alt="register"
              width={"60%"}
              height={"20%"}
            ></img>
          <b><i>
          <h2>Patient Portal</h2>
          </i>
          </b>
    
        <div class="menus">
            <a href="/Patient/doctorsforpat"><icon-icon name="doctors-outline"></icon-icon>Doctors List</a>
            <a href="/Patient/postpatient"><icon-icon name="home-outline"></icon-icon> Take An Appointment</a>
            <a href="/Patients/patportal/all/all"><icon-icon name="hospital-outline"></icon-icon> Appoinments List</a>
            <a href="/Patient/prescription"><icon-icon name="prescriptions-outline"></icon-icon> Add Prescriptions</a>
            <a href="/Patient/reports"><icon-icon name="prescriptions-outline"></icon-icon> Add Lab Reports</a>
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
    </>
)
}

export default PatDashboard;