import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, imageUrl } from "../links";
import { Navigate } from "react-router-dom";

function Description(props) {
  let userToken = localStorage.getItem("userToken");
  let { postToken } = useParams();
  const [details, setDetails] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    //console.log(adToken);
    async function fetchData() {
      let response = await axios.get(baseUrl + `/home/appointments/details/` + postToken);
      //console.log(response["data"]["data"]["details"]);
      setDetails(response["data"]["data"]["details"]);
    }
    fetchData();
  }, []);

  const handleMarkAsTreated = async () => {
    let response = await axios.get(baseUrl + "/user/mark/treated/" + postToken, {
      headers: { userToken: userToken },
    });

    if (response.data.error.errorCode) {
    } else {
      setButtonClicked(true);
    }
  };

  if (buttonClicked) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="detail_container bg-light" style={{ marginTop: "100px" }}>
        <div className="d-flex pt-3">
          <div className="me-auto p-2">
          <h3 className="d-inline">{details.name}</h3>
            <div className="text-muted mt-2">Posted on {details.createdAt}</div> 
          </div>
        </div>
        <div className="row mt-3 p-2">
          <div className="col-9">
            <img src={imageUrl + details.image} alt = "" width="50%"></img>
            <div className="text-muted py-4">
              <h4 className="text-success  d-inline"> Age: {details.age}</h4>
              <p className="d-inline ms-3 ">
                {details.isMale ? "Male" : "Female"}
              </p>
            </div>
            <div>
              <h6>Address</h6>
              <p>{details.address}</p>
            </div>
            <div>
              <h6>NID</h6>
              <p>{details.nid}</p>
            </div>
            <div>
              <h6>email</h6>
              <p>{details.email}</p>
            </div>
            <div>
              <h6>Description</h6>
              <p>{details.description}</p>
            </div>
          </div>
          <div className="col-3">
          <div className="border p-3">
              <h4>Appointed to:</h4>
              <p className="mt-4 mb-1">Doctor</p>
              <h6>{details.doctorSlug}</h6>
              <p className="mt-4 mb-1">Specialist</p>
              <h6>{details.departmentSlug}</h6>
            </div>
            
            <div className="border p-3">
              <h4>Appointed by:</h4>
              <p className="mt-4 mb-1">Name</p>
              <h6>{details.hospitalname}</h6>
              <p className="mt-4 mb-1">location</p>
              <h6>{details.location}</h6>
            </div>
            
            <div className="border p-3">
             <h5>Patients Contact: </h5>
              <i>
                <FontAwesomeIcon icon={faPhoneSquareAlt} size="lg" />
              </i>
              <h5 className="d-inline-block ms-2">{details.phoneNumber}</h5>
            </div>
            <div className="d-grid">
              <button
                onClick={(event) => {
                  handleMarkAsTreated();
                }}
                type="button"
                className={
                  "btn btn-success mt-5 d-block " +
                  (userToken && userToken === details.createdBy ? "" : "d-none")
                }
              >
                Mark as Treated
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Description;
