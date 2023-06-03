import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HOSNavbar = () => {

  const [myAccount, setMyAccount] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    async function fetchData() {

      let userToken = localStorage.getItem("userToken");
      if (userToken){
          setMyAccount("");
          setLogin("d-none");
      } else {
        setMyAccount("d-none");
        setLogin("");
      }
    }
    fetchData();


    
  }, []);
    return (
        <nav className="color-nav navbar fixed-top navbar-expand navbar-dark">
          <div className="container">
            <a className="navbar-brand text-light" href="/"><b><i>
              ShasthoSeba
              </i>
              </b>
            </a>
            <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item me-1">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/patients">Patients</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/doctors">Doctors</Link>
          </li>
          <li className="nav-item me-1">
            <Link className="nav-link" to="/patients/all/all">Appointments</Link>
          </li>
        </ul>
        <div className="nav-item me-3">
            <a className={"text-white text-decoration-none " + myAccount} href="/dashboard">
              Dashboard
            </a>
          </div>
              <a href="/post/patient">
                <button className="btn btn-lg btn-light">Appoint Patients</button>
              </a>
            </div>
        </nav>
      );
};

export default HOSNavbar;
