import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import PatNavbar from "./patnav";
import Footer from "../footer";
import { baseUrl } from "../../links";

function Prescription(props){

  const userToken = localStorage.getItem("userToken");
    const [name,setName] = useState("");
    const [image,setImage] = useState('');
    const [color, setColor] = useState("danger");
    const [status, setStatus] = useState("");
    const [prescriptionPosted, setPrescriptionPosted] = useState(false);
    const [conditionRadioButton, setConditionRadioButton] = useState(false);
 

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name) {
    setColor("danger");
    setStatus("Name can't be empty");
    return;
  }

  if (conditionRadioButton === false) {
    setColor("danger");
    setStatus("Your must agree to the terms and conditions");
    return;
  }

  let body = {
    name: name,
    image: image
  }
  
  let response = await axios.post(baseUrl + "/user/prescription/new", body,{
      headers: { userToken: userToken },
  });

  console.log("Hocche");
  if (response.data.error.errorCode) {
    setColor("danger");
    setStatus(response.data.error.errorDetails);
  } else {
    setPrescriptionPosted(true);
  }
};

if (prescriptionPosted) {
  return <Navigate to="/Patient/patientDash" replace />;
}

const handleImageUpload = async (event) => {
  setStatus("");
  const base64image = await convertBase64(event.target.files[0]);
  // console.log(base64image);
  setImage(base64image);
}

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

  return(
    <>
      <PatNavbar />
      <div style={{marginTop: "170px"}}>
        <h5><center><b>Upload Prescription</b></center></h5>
        <form onSubmit={handleSubmit} className="w-100">
        <div className="row mt-5">
          <div className="col-6 mx-auto">
              <div className="form-floating mb-3">
                <input
                    type="text"
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="fullNameInput"
                    placeholder="Full Name"
                ></input>
                <label for="fullNameInput">Full Name</label>
              </div>
                
            <h5>Add Prescription</h5>
              <div>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleImageUpload}
                  class="form-control mb-2"
                ></input>
              </div>
              <div class="form-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={conditionRadioButton}
                  onChange={(e) => {
                    setStatus("");
                    setConditionRadioButton(e.target.checked);
                  }}
                  id="termsAndConditionsInput"
                ></input>
                <label class="form-check-label" for="termsAndConditionsInput">
                  I have read and accept the Terms and Conditions <span class="required">*</span>
                </label>
              </div>
              <div className="d-flex justify-content-between">
                <div
                  className={!status ? "d-none" : "alert alert-" + color}
                  role="alert"
                >
                  {status}
                </div>
                <button
                  type="submit"
                  className="ms-auto btn-lg mb-3 btn-success"
                >
                  Add Prescription
                  
                </button>
              </div>
          </div>
          </div>
        </form> 
        </div>
        <Footer /> 
        </>
  );
  }

  export default Prescription;