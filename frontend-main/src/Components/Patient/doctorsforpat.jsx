import React from "react";
import PatNavbar from "./patnav";
import Footer from "../footer";
import Lesgoo from "../united";

function PatDoctor(){

    return(
        <>
        <PatNavbar />
            <div className="p-5 container shadow-sm rounded" id = "contid" style={{marginTop:"150px"}} >
            <Lesgoo />
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

export default PatDoctor;