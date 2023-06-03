import React, { useState, useEffect } from "react";
import axios from "axios";

import { baseUrl } from "../../links";



const DocDash = () => {
 

  return (
    <>
      <div className="nav-wrapper">
        <div className="sidebardoc">
          <div className="nav__logo">
            <a href="/">
            <img
              src={require("../../Photos/logo.jpg")}
              alt="Green tick"
              width={"22%"}
              height={"22%"}
            ></img>
              <span className="text-lg font-bold">SasthoSeba</span>
            </a>
          </div>
          <ul className="nav__menu">
            <li className="nav__menu-item">
              <a href="/Doctor/docdash2">Dashboard</a>
            </li>
            <li className="nav__menu-item">
              <a href="/Doctor/myappointments">My Patients</a>
            </li>
            <li className="nav__menu-item">
              <a href="/report">Reports</a>
            </li>
            <li className="nav__menu-item">
              <a href="/aphistory">Appointment History</a>
            </li>
            <li className="nav__menu-item">
              <a href="/Doctor/scheduler">Scheduler</a>
            </li>
          </ul>
        </div>
        <div className="welcome-intro">
         
        </div>
      </div>
    </>
  );
};

export default DocDash;
