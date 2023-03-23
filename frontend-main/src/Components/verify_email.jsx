import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar";
import Footer from "./footer";
import { baseUrl } from "../links";
import {useParams} from "react-router-dom"


function VerifyEmail() {

    let {verifyToken} = useParams();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(baseUrl + "/auth/verifyEmail/" + verifyToken);
            console.log(verifyToken);
        }
        fetchData();
      }, []);
      
    return <>
        <Navbar />
        <div className="p-3 container  rounded align-items-center" style={{marginTop:"100px"}}>
           <center><img
              src={require("../Photos/emailsuccess.jpg")}
              alt="Green tick"
              width={"22%"}
              height={"22%"}
            ></img></center>
            <center><h1>Email Verification</h1></center>
            <center>You can now sign in with your new Account</center>
        </div>
        <Footer />
    </>
}

export default VerifyEmail;