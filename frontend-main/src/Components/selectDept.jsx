import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./footer";
import { Navigate } from "react-router-dom";
import { baseUrl } from "../links";
import Appoint from "./appoint";
import HOSNavbar from "./hospitalNav";

function SelectDeptDoctor() {
  const userToken = localStorage.getItem("userToken");
  const [listOfDepartment, setListOfDepartment] = useState([]);
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [doctorDisplay, setDoctorDisplay] = useState("d-none");
  const [department, setDepartment] = useState({});
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/home/doctors");
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfDoctors(tempList);

      response = await axios.get(baseUrl + "/home/departments");
      tempList = response["data"]["data"]["details"]["items"];
      setListOfDepartment(tempList);
    }
    fetchData();
  }, []);
  
  const onDeptClick = (e) => {
    //e.preventDefault();
    setDepartment((old) => ({
      ...old,
      ...e,
    }));
    setDoctorDisplay("d-block");
  };

  const onDoctClick = (e) => {
    //e.preventDefault();
    setDoctor((old) => ({
      ...old,
      ...e,
    }));
  };

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  if (doctor && Object.keys(doctor).length !== 0) {
    return <Appoint doctor={doctor} department={department} />;
  }

  return (
    <>
      <HOSNavbar />
      <div className="container bg-light rounded" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-6 mt-3">
            <h4>Select Department</h4>
            <ul className="list-group list-group-flush my-3">
              {listOfDepartment.map((e) => (
                <li
                  key={e.token}
                  className="list-group-item p-3 rounded"
                  onClick={(i) => {
                    onDeptClick({
                      slug: e.slug,
                      title: e.title,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
          <div className={`col-6 ${doctorDisplay} mt-3`}>
            <h4>Select a Doctor</h4>
            <ul className="list-group list-group-flush my-3">
              {listOfDoctors.map((e) => (
                <li
                  key={e.token}
                  className="list-group-item p-3 rounded"
                  onClick={(i) => {
                    onDoctClick({
                      slug: e.slug,
                      title: e.title,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelectDeptDoctor;
