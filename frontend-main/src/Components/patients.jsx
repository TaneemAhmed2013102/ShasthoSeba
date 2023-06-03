import React, { useState, useEffect } from "react";
import axios from "axios";
import HOSNavbar from "./hospitalNav";
import Footer from "./footer";
import Item from "./item";
import { baseUrl } from "../links";
import { Navigate } from "react-router-dom";

function Patients() {

  const userToken = localStorage.getItem("userToken");
  const [listOfPatients, setListOfPatients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userToken = localStorage.getItem("userToken");
      console.log(userToken);

      let response = await axios.get(baseUrl + "/user/patients", {
        headers: { userToken: userToken },
      });
      setListOfPatients(response["data"]["data"]["details"]["items"]);
      // console.log(response["data"]);
    }
    fetchData();
  }, []);

  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <HOSNavbar />
      <div className="container bg-light" style={{ marginTop: "150px" }}>
          <h1 class="font-weight-bold"><center>OUR PATIENTS</center></h1>
          <div className="p-5 container shadow-sm rounded" id = "contid">
            {listOfPatients.map((e) => (
              <Item list={e} />
            ))}
          </div>
          </div>
      <Footer />
    </>
  );
}

export default Patients;
