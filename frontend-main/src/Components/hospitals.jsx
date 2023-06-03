import React, { useState, useEffect } from "react";
import Navbar from './navbar';
import Footer from './footer';
import { baseUrl } from "../links";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";

function Hospital(){
    
  const [listOfHospitals, setListOfHospitals] = useState([]);

  useEffect(() => {
      async function fetchData() {
          let response = await axios.get(baseUrl + '/home/regestered/hospitals');
          let tempList = response["data"]["data"]["details"]["items"];
          setListOfHospitals(tempList);
      }
      fetchData();
  }, []);

return(
    <>
    <Navbar />
    <div className="container" style={{marginTop:"80px"}}>
      <div className="cardlog"> 
      <center><h3 class="homeh"><i><FontAwesomeIcon icon={faHospital} /></i></h3></center>
      <div className="navbar-brand">
      <h2><strong><u>OUR Registered Hospitals</u></strong></h2>
        </div>   
            <br></br>
      <ul className="list-unstyled">
              { listOfHospitals.map(e => <li className="mb-2"><center><h3 class="homeh"><i>{e.hospitalname}</i></h3></center> </li>) }
            </ul>
      </div>
    </div>
    <Footer />
    </>
);
};

export default Hospital;