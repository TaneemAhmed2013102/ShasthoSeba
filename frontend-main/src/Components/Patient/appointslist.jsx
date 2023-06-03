import React, { useState, useEffect } from "react";
import axios from "axios";
import PatNavbar from "./patnav";
import Footer from "../footer";
import { baseUrl } from "../../links";
import PatSideBar from "./patSide";
import {useParams} from "react-router-dom"
import PatItem from "./patitem";

function PatList() {

  const {doctor, department} = useParams();
  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.post(baseUrl + '/home/patients', {
        doctor: doctor,
        department: department,
      });
      setListOfPatients(response["data"]["data"]["details"]["items"]);
    }
    fetchData();
  }, []);

  return (
    <>
      <PatNavbar />
      <div className="container bg-light" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-3 border-end border-2">
            {<PatSideBar doctor = {doctor} department = {department}/>}
          </div>
          <div className="col-9">
            {listOfPatients.map((e) => <PatItem list={e} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatList;
