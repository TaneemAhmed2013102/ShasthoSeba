import React, { useState, useEffect } from "react";
import axios from "axios";
import HOSNavbar from "./hospitalNav";
import Footer from "./footer";
import Item from "./item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../links";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [details, setDetails] = useState({});
  const userToken = localStorage.getItem("userToken");
  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userToken = localStorage.getItem("userToken");
      console.log(userToken);
      console.log("HOLA");
      let response = await axios.get(baseUrl + "/user/details", {
        headers: { userToken: userToken },
      });
      setDetails(response["data"]["data"]["details"]);

      response = await axios.get(baseUrl + "/user/patients", {
        headers: { userToken: userToken },
      });
      setListOfPatients(response["data"]["data"]["details"]["items"]);
      // console.log(response["data"]);
    }
    fetchData();
  }, []);

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
      <div className="container bg-light" style={{ marginTop: "100px" }}>
        <div className="row py-3">
          <div className="col-3 border-end border-2 p-4">
            <i className="me-2">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </i>
            <h3 className="d-inline-block">Dashboard</h3>
            <p className="mt-4 mb-1">Hospital Name</p>
            <h6>{details.hospitalname}</h6>
            <p className="mt-4 mb-1">Location</p>
            <h6>{details.location}</h6>
            <p className="mt-4 mb-1">Total Untreated Patients:</p>
            <h6>{details.totalPatients}</h6>
            <p className="mt-4 mb-1">Total Patient Treated:</p>
            <h6>{details.treatedPatients}</h6>
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
          <div className="col-9 p-3">
            <h3 className="pb-3">My Patients List</h3>
            {listOfPatients.map((e) => (
              <Item list={e} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
