import React from "react";
import HOSNavbar from "./hospitalNav";
import Footer from "./footer";
import ENTDoctorList from "./ent";
import CardiacDoctorList from "./cardiology";
import CardiacSurgeryDoctorList from "./cardiac_surgery";
import DermatoDoctorList from "./dermatology";
import NeuroDoctorList from "./neurology";
import UroDoctorList from "./urology";
import AnesDoctorList from "./anesthesilogy";

function Doctor(){

    return(
        <>
        <HOSNavbar />
        <div className="container" style={{marginTop:"150px"}}>
            <h1 class="font-weight-bold"><center>OUR SPECIAL DOCTORS</center></h1>
            </div>
            <div className="p-5 container shadow-sm rounded" id = "contid">
            <h2 class="font-weight-bold"><u><center>Anesthesilogy Doctors:</center></u></h2>
            <br></br>
            <br></br>
            <AnesDoctorList />
            <h2 class="font-weight-bold"><u><center>Cardiology Doctors:</center></u></h2>
            <br></br>
            <br></br>
            <CardiacDoctorList />
            <h2 class="font-weight-bold"><u><center>Cardiac Surgery Doctors:</center></u></h2>
            <br></br>
            <br></br>
            <CardiacSurgeryDoctorList />
            <h2 class="font-weight-bold"><u><center>Dermatology Doctors:</center></u></h2>
            <br></br>
            <br></br>
            <DermatoDoctorList />
            <h2 class="font-weight-bold"><u><center>ENT & Head Neck Surgery Doctors:</center></u></h2>
            <br></br>
            <br></br>   
            <ENTDoctorList />
            <h2 class="font-weight-bold"><u><center>Neurology Doctors:</center></u></h2>
            <br></br>
            <br></br>   
            <NeuroDoctorList />
            <h2 class="font-weight-bold"><u><center>Urology Doctors:</center></u></h2>
            <br></br>
            <br></br>   
            <UroDoctorList />
                <style>
                    {`
                        ul.doctor-list {
                            list-style: none;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                        }

                        li.list {
                            width: 25%;
                            display: flex;
                            align-items: center;
                            margin-bottom: 20px;
                            margin-left: 0px;
                        }

                        h2 {
                            margin: 0;
                        }

                        p {
                            margin: 5px 0;
                        }
                    `}
                </style>
                </div>
    <Footer />
    </>
    
    )
}

export default Doctor;