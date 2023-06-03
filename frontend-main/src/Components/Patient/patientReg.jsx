import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import PatNavbar from "./patnav";
import Footer from "../footer";
import { baseUrl } from "../../links";

function PatRegister() {
  const userToken = localStorage.getItem("userToken");
  const [fullname, setFullname] = useState("");
  const [fathersname, setFathersname] = useState("");
  const [mothersname, setMothersname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [nid, setNid] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  if (!!userToken) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    // console.log(`${fullname}*${email}*${password}*${confirmPassword}`);
    e.preventDefault();

    const characterCheck = /[a-zA-Z]/g;
    const digitCheck = /\d/;
    const specialCharCheck = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; 

    if (!fullname) {
      setColor("danger");
      setStatus("Name can't be empty");
      return;
    }

    
    if (!fathersname) {
      setColor("danger");
      setStatus("Father's name can't be empty");
      return;
    }

    
    if (!mothersname) {
      setColor("danger");
      setStatus("Mother's name can't be empty");
      return;
    }

    
    if (!dateofbirth) {
      setColor("danger");
      setStatus("Date of birth can't be empty");
      return;
    }


    if (!phonenumber) {
      setColor("danger");
      setStatus("Phone number can't be empty");
      return;
    }


    if (!address) {
        setColor("danger");
        setStatus("Address can't be empty");
        return;
      }
      

    if (!nid) {
      setColor("danger");
      setStatus("Nid can't be empty");
      return;
    }


    if (!age) {
      setColor("danger");
      setStatus("Age can't be empty");
      return;
    }

    
    if (!weight) {
      setColor("danger");
      setStatus("Weight can't be empty");
      return;
    }


    if (!height) {
      setColor("danger");
      setStatus("Height can't be empty");
      return;
    }

    if (!bloodgroup) {
      setColor("danger");
      setStatus("Blood group can't be empty");
      return;
    }

    // if (!digitCheck.test(fullname)) {
    //   setColor('danger');
    //   setStatus("Fullname can't contain digit");
    //   return;
    // }

    if (!email) {
      setColor("danger");
      setStatus("Email can't be empty");
      return;
    }

    if (!password) {
      setColor("danger");
      setStatus("Password can't be empty");
      return;
    }

    if (password.length < 8) {
      setColor("danger");
      setStatus("Password must contain at least 8 characters");
      return;
    }

    if (!digitCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 digit");
      return;
    }

    if (!characterCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 character");
      return;
    }

    if (!specialCharCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 special character");
      return;
    }

    if (!confirmPassword || password !== confirmPassword) {
      setColor("danger");
      setStatus("Password did not match");
      return;
    }

    if (!validateEmail()) {
      setColor("danger");
      setStatus("Invalid email");
      return;
    }

    let response = await axios.post(baseUrl + "/auth/patient/register", {
      fullname: fullname,
      fathersname: fathersname,
      mothersname: mothersname,
      dateofbirth: dateofbirth,
      phonenumber: phonenumber,
      address: address,
      nid: nid,
      age: age,
      weight: weight,
      height: height,
      bloodgroup: bloodgroup,
      email: email,
      password: password,
    });

    // console.log(response.data);
    if (response.data.error.errorCode) {
      setColor("danger");
      setStatus(response.data.error.errorDetails);
    } else {
      setColor("success");
      setStatus(response.data.data.details);
    }
  };

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <PatNavbar />
      <div
        className="p-5 container shadow-sm rounded" id = "contid" style={{marginTop:"100px"}}
      >
        <div>
          <h1 className="text-center pb-3"id = "txtcolr"><font face = "Margadeth">Paitent Registration</font></h1>
          <div className="d-flex p-2 h-100 align-items-center">
            <img
              src={require("../../Photos/patient.jpg")}
              alt="register"
              width={"40%"}
              height={"40%"}
            ></img>
            <form onSubmit={handleSubmit} className="w-100">
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={fullname}
                    onInput={(e) => setFullname(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="fullNameInput"
                    placeholder="Full Name"
                  ></input>
                  <label for="fullNameInput">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={fathersname}
                    onInput={(e) => setFathersname(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="fatherssnameInput"
                    placeholder="Father's Name"
                  ></input>
                  <label for="locationInput">Father's Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    value={mothersname}
                    onInput={(e) => setMothersname(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="mothersnameInput"
                    placeholder="Mother's Name"
                  ></input>
                  <label for="locationInput">Mother's Name</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={dateofbirth}
                    onInput={(e) => setDateofbirth(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="dateofbirthInput"
                    placeholder="Date Of Birth"
                  ></input>
                  <label for="locationInput">Date Of Birth</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={phonenumber}
                    onInput={(e) => setPhonenumber(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="phonenumberInput"
                    placeholder="Phone Number"
                  ></input>
                  <label for="locationInput">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={address}
                    onInput={(e) => setAddress(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="addressInput"
                    placeholder="Address"
                  ></input>
                  <label for="locationInput">Address</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={nid}
                    onInput={(e) => setNid(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="nidInput"
                    placeholder="Nid"
                  ></input>
                  <label for="locationInput">Nid</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={age}
                    onInput={(e) => setAge(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="ageInput"
                    placeholder="Age"
                  ></input>
                  <label for="locationInput">Age</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={weight}
                    onInput={(e) => setWeight(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="weightInput"
                    placeholder="Weight"
                  ></input>
                  <label for="locationInput">Weight</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={height}
                    onInput={(e) => setHeight(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="heightInput"
                    placeholder="Height"
                  ></input>
                  <label for="locationInput">Height</label>
                </div>
                <div className="form-floating mb-3">
                <input
                    type="text"
                    value={bloodgroup}
                    onInput={(e) => setBloodgroup(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="mothersnameInput"
                    placeholder="Blood Group"
                  ></input>
                  <label for="locationInput">Blood Group</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="emailInput"
                    placeholder="Email Address"
                  ></input>
                  <label for="emailInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password"
                  ></input>
                  <label for="passwordInput">Password</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    value={confirmPassword}
                    onInput={(e) => setConfirmPassword(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Confirm Password"
                  ></input>
                  <label for="confirmPasswordInput">Confirm Password</label>
                </div>
                <div className="d-flex justify-content-between mt-3">
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
                    Register
                  </button>
                </div>
                {/* NEED TO EDIT */}
                <p className="mt-4 text-center">
                  Already have an account?{" "}
                  <a href="/Patient/patlogin" className="text-decoration-none">
                    <strong className="text-success">Log in</strong>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PatRegister;