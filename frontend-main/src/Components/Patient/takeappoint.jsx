import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faTag } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../../links";
import {Navigate} from "react-router-dom";
import PatNavbar from "./patnav";

function TakeAppoint(props) {
  let userToken = localStorage.getItem("userToken");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("danger");
  const [conditionRadioButton, setConditionRadioButton] = useState(false);
  const [maleButton, setMaleButton] = useState(false);
  const [femaleButton, setFemaleButton] = useState(false);
  const [details, setDetails] = useState({});
  const [image, setImage] = useState('');
  const [patientPosted, setPatientPosted] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setColor("danger");
      setStatus("Name can't be empty");
      return;
    }

    if (!age) {
      setColor("danger");
      setStatus("Age can't be empty");
      return;
    }

    if (!address) {
      setColor("danger");
      setStatus("Address can't be empty");
      return;
    }

    if (!email) {
      setColor("danger");
      setStatus("Email can't be empty");
      return;
    }

    if (!image) {
      setColor("danger");
      setStatus("Your must upload an image");
      return;
    }

    if (!phoneNumber) {
      setColor("danger");
      setStatus("Phone Number can't be empty");
      return;
    }

    if (phoneNumber.length !== 11) {
      setColor("danger");
      setStatus("Phone Number must be of 11 digits");
      return;
    }

    if (isNaN(phoneNumber)) {
      setColor("danger");
      setStatus("Phone Number must only contain digits");
      return;
    }

    if (phoneNumber.substring(0, 2) !== "01") {
      setColor("danger");
      setStatus("Phone Number must start with 01");
      return;
    }

    if (conditionRadioButton === false) {
      setColor("danger");
      setStatus("Your must agree to the terms and conditions");
      return;
    }

    let body = {
      name: name,
      age: age,
      address: address,
      email: email,
      description: description,
      nid: nid,
      isMale: maleButton,
      isFemale: femaleButton,
      phoneNumber: phoneNumber,
      image: image,
      departmentSlug: props.department.slug,
      doctorSlug: props.doctor.slug,
    }
    
    let response = await axios.post(baseUrl + "/user/patients/new", body,{
      headers: { userToken: userToken },
    });
    console.log(body);
    if (response.data.error.errorCode) {
      setColor("danger");
      setStatus(response.data.error.errorDetails);
    } else {
      setPatientPosted(true);
    }

  };

  if (patientPosted) {
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

  return (
    <>
      <PatNavbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div class="d-flex pt-3">
          <div class="me-auto p-2">
            <h5>Patient Appoinment Form</h5>
          </div>
          <div class="p-2">
            <i className="m-2">
              <FontAwesomeIcon icon={faUserDoctor} />
            </i>
            <h6 className="d-inline-block me-3">{props.doctor.title}</h6>
            <i className="m-2">
              <FontAwesomeIcon icon={faTag} />
            </i>
            <h6 className="d-inline-block me-5">{props.department.title}</h6>
          </div>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="row mt-5">
            <div className="col-6 mx-auto">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="nameInput"
                  placeholder="Full Name"
                ></input>
                <label for="nameInput">Full Name <span class="required">*</span></label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  value={age}
                  onInput={(e) => setAge(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="ageInput"
                  placeholder="Age"
                ></input>
                <label for="ageInput">Age <span class="required">*</span></label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={maleButton}
                  id="maleInput"
                  onChange={(e) => setMaleButton(e.target.checked)}
                ></input>
                <label class="form-check-label" for="maleInput">
                  Male
                </label>
              </div>
              <div class="form-check mb-3">
              <input
                  class="form-check-input"
                  type="checkbox"
                  value={femaleButton}
                  id="femaleInput"
                  onChange={(e) => setFemaleButton(e.target.checked)}
                ></input>
                <label class="form-check-label" for="femaleInput">
                  Female
                </label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  onChange={(e) => setStatus("")}
                  class="form-control"
                  id="phoneNumberInput"
                  placeholder="Phone Number"
                ></input>
                <label for="phoneNumberInput">Phone Number <span class="required">*</span></label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  value={address}
                  onInput={(e) => setAddress(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="addressInput"
                  placeholder="Address"
                ></input>
                <label for="addressInput">Address <span class="required">*</span></label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  value={nid}
                  onInput={(e) => setNid(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="nidInput"
                  placeholder="NID"
                ></input>
                <label for="nidInput">NID</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  value={email}
                  onInput={(e) => setEmail(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="emailInput"
                  placeholder="Email"
                ></input>
                <label for="nameInput">Email <span class="required">*</span></label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  value={description}
                  onInput={(e) => setDescription(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  placeholder="Description"
                  id="descriptionInput"
                  style={{ height: "300px" }}
                ></textarea>
                <label for="descriptionInput">Description </label>
              </div>
              <hr></hr>
              <h5>Add a photo <span class="required">*</span> </h5>
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
              <div class="form-check mb-3 mt-5">
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
                  Add
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

export default TakeAppoint;
