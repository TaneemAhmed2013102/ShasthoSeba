import React, { useState, useEffect } from "react";
import axios from "axios";
import DocNavbar from "./docnav";
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../links";
import DocItem from "./docItem";

function DocAppointments() {
  const [details, setDetails] = useState({});
  const [appointments, setAppointments] = useState([]); 
  const doctorsname = localStorage.getItem("doctorsname");

  console.log(doctorsname);
  
  useEffect(() => {
    async function fetchAppointments() {
      try {
        let doctorsname = localStorage.getItem("doctorsname");
        console.log(doctorsname);
        const response = await axios.get(baseUrl + '/doctor/appointments', {
          headers: { doctorsname: doctorsname }
        });
        const data = response.data.data;
        const items = data.details.items;
        setAppointments(items);
      } catch (error) {
        console.error('Error:', error);
        // Handle the error
      }
    }

    fetchAppointments();
  }, []);
  return (
    <>
      <DocNavbar />
      <div className="container bg-light" style={{ marginTop: "100px" }}>
        <div className="row py-3">
          <div className="col-3 border-end border-2 p-4">
            <i className="me-2">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </i>
            <h3 className="d-inline-block">Summary</h3>
            <p className="mt-4 mb-1">Total Untreated Patients:</p>
            <h6>{details.untreatedPatients}</h6>
            <p className="mt-4 mb-1">Total Patient Treated:</p>
            <h6>{details.treatedPatients}</h6>
          </div>
          <div className="col-9 p-3">
            <h3 className="pb-3">My Patients List</h3>
            {appointments.map((e) => (
              <DocItem list={e} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DocAppointments;
