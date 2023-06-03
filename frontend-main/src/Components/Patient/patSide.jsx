import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faTag } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../links";

function PatSideBar(props) {
  const [listOfDoctors, setListOfDoctors] = useState([]);
  const [listOfDepartment, setListOfDepartment] = useState([]);
  let doctor = props.doctor;
  let department = props.department;


  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/home/doctors");
      console.log(response);
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfDoctors(tempList);
      response = await axios.get(baseUrl + "/home/departments");
      tempList = response["data"]["data"]["details"]["items"];
      setListOfDepartment(tempList);
    }
    fetchData();
  }, []);


  return (
    <>
            <div className="d-block">
              <i className="m-2">
                <FontAwesomeIcon icon={faUserDoctor} />
              </i>
              <h6 className="d-inline-block me-3 mb-3">Select Doctor</h6>
            </div>
            <div className="d-inline">
              {listOfDoctors.map((e) => (
                <button onClick={(event) => {
                  if (e.slug !== props.doctor) {
                    doctor = e.slug;
                  } else {
                    doctor = "all"; 
                  }
                  window.location.href = `/Patients/patportal/${doctor}/${department}`;
                }} type="button" className={"btn btn-outline-dark ms-2 mb-2 " + ((e.slug === props.doctor) ? "active" : "")}>
                  {e.title}
                </button>
              ))}
            </div>
            <div className="d-block mt-4">
              <i className="m-2">
                <FontAwesomeIcon icon={faTag} />
              </i>
              <h6 className="d-inline-block me-3 mb-3">Select Department</h6>
            </div>
            <ul class="list-group list-group-flush mb-3">
              {listOfDepartment.map((e) => (
                <li
                  key={e.token}
                  onClick={(event) => {
                    if (e.slug !== props.department) {
                      department = e.slug;
                    } else {
                      department = "all"; 
                    }
                    window.location.href = `/Patients/patportal/${doctor}/${department}`;
                  }}
                  className={"list-group-item p-3 rounded " + ((e.slug === props.department) ? "list-group-item-primary" : "bg-light")}
                  style={{ cursor: "pointer"}}
                >
                  {e.title}
                </li>
              ))}
            </ul>
    </>
  );
}

export default PatSideBar;