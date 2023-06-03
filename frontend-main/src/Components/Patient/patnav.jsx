import React from "react";
import { Link } from "react-router-dom";

const PatNavbar = () => {
    return (
        <nav className="color-nav navbar fixed-top navbar-expand navbar-dark">
          <div className="container">
            <a className="navbar-brand text-light" href="/Patient/patientDash"><b><i>
              ShasthoSeba
              </i>
              </b>
            </a>
            <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item me-1">
            <Link className="nav-link" to="/Patient/patientDash">Dashboard</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Patient/doctorsforpat">Doctors List</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Patients/patportal/all/all">Appointments List</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Patient/prescription">Prescription</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Patient/reports">Report</Link>
          </li>
        </ul>
              <a href="/Patient/postpatient">
                <button className="btn btn-lg btn-light">Take Appointment</button>
              </a>
            </div>
        </nav>
      );
};

export default PatNavbar;
