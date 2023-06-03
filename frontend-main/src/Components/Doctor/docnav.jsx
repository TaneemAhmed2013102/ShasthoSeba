import React from "react";
import { Link } from "react-router-dom";

const DocNavbar = () => {
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
            <Link className="nav-link" to="/Doctor/docdash">Dashboard</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Doctor/myappointments">Patients</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Doctor/prescription">Scheduler</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/Doctor/reports">Report</Link>
          </li>
        </ul>
              <a href="/Doctor/postpatient">
                <button className="btn btn-lg btn-light">Make Appointment</button>
              </a>
            </div>
        </nav>
      );
};

export default DocNavbar;
