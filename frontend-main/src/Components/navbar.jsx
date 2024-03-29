import React, { useState, useEffect } from "react";

function Navbar() {

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
            <a href={`/hospitals`}>
              <button className="btn btn-light btn-sm">Hospitals</button>
            </a>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <div className="nav-item me-3">
            <a className={"text-white text-decoration-none " + login} href="/hdplogin">
              Login
            </a>
          </div>
          <a href="/dashboard">
            <button className="btn btn-lg btn-light">My Portal</button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;