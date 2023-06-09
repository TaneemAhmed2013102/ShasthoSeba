import React, { useState, useEffect } from "react";
import DocNavbar from "./docnav";
import Footer from "../footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, imageUrl } from "../../links";

function DoctReport(props) {
  const { name } = useParams();
  const [details, setDetails] = useState({});
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  // // useEffect(() => {
  // //   fetchData();
  // // }, []);

  // // useEffect(() => {
  // //   if (searchResult) {
  // //     setDetails(searchResult);
  // //   } else {
  // //     fetchData();
  // //   }
  // // }, [searchResult]);

  // // const fetchData = async () => {
  // //   try {
  // //     let response;
  // //     if (searchName) {
  // //       response = await axios.get(baseUrl + `/user/reports/` + searchName);
  // //     } else {
  // //       response = await axios.get(baseUrl + `/user/reports/` + name);
  // //     }
  // //     setDetails(response.data.data.details);
  // //     setSearchError(null);
  // //   } catch (error) {
  // //     setSearchError("Error retrieving data");
  // //   }
  // // };

  // const handleSearch = () => {
  //   setSearchResult(null);
  //   fetchData();
  // };

  return (
    <>
      <DocNavbar />
      <div className="detail_container bg-light" style={{ marginTop: "100px" }}>
        <div className="d-flex pt-3">
          <div className="me-auto p-2">
            <h3 className="d-inline">{details.name}</h3>
          </div>
        </div>
        <div className="row mt-3 p-2">
          <div className="col-9">
            <div>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            <img src={imageUrl + details.image} alt="" width="50%" />
            <div className="text-muted py-4">
              <p className="d-inline ms-3 ">
                {details.isMale ? "Male" : "Female"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DoctReport;
