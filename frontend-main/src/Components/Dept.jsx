import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { baseUrl } from "../links";

function SelectDept() {
  const userToken = localStorage.getItem("userToken");
  const [listOfDepartment, setListOfDepartment] = useState([]);
  const [department, setDepartment] = useState({});
  

  useEffect(() => {
    async function fetchData() {
      
      let response = await axios.get(baseUrl + "/home/departments");
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfDepartment(tempList);
    }
    fetchData();
  }, []);
  
  const onDeptClick = (e) => {
    //e.preventDefault();
    setDepartment((old) => ({
      ...old,
      ...e,
    }));
  };

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }
  

  return (
    <>
      <div className="container bg-light rounded" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-6 mt-3">
            <h4>Select Department</h4>
            <ul className="list-group list-group-flush my-3">
              {listOfDepartment.map((e) => (
                <li
                  key={e.token}
                  className="list-group-item p-3 rounded"
                  onClick={(i) => {
                    onDeptClick({
                      slug: e.slug,
                      title: e.title,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
          </div>
      </div>
    </>
  );
}

export default SelectDept;
