import React, { useState, useEffect } from "react";
import axios from "axios";
import HOSNavbar from "./hospitalNav";
import Footer from "./footer";
import Item from "./item";
import { baseUrl } from "../links";
import SideBar from "./sidebar";
import {useParams} from "react-router-dom"

function PatientsList() {

  const {doctor, department} = useParams();
  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.post(baseUrl + '/home/appointments_list', {
        doctor: doctor,
        department: department,
      });
      setListOfPatients(response["data"]["data"]["details"]["items"]);
    }
    fetchData();
  }, []);

  return (
    <>
      <HOSNavbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-3 border-end border-2">
            {<SideBar doctor = {doctor} department = {department}/>}
          </div>
          <div className="col-9">
            {listOfPatients.map((e) => <Item list={e} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatientsList;
