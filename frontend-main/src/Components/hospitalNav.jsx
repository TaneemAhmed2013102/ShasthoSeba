import React from "react";
import { Link } from "react-router-dom";

const HOSNavbar = () => {
    return (
        <nav className="color-nav navbar fixed-top navbar-expand navbar-dark">
          <div className="container">
            <a className="navbar-brand text-light" href="/"><b><i>
              ShasthoSeba
              </i>
              </b>
            </a>
            <ul className="navbar-nav me-auto mb-lg-0">
          <li className="nav-item me-1">
            <Link className="nav-link" to="/patients">Patients</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/doctors">Doctors</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/patients/all/all">Appointments</Link>
          </li>
        </ul>
              <a href="/post/patient">
                <button className="btn btn-lg btn-light">Appoint Patients</button>
              </a>
            </div>
        </nav>
      );
};

export default HOSNavbar;
