import React, { useState, useEffect } from 'react'
import Navbar from "./navbar";
import Footer from "./footer";
import AdminPage from './admin';


function Home() {
    return <>
        <Navbar />
        <div className="container" style={{marginTop:"100px"}}>
            <h6 class="font-weight-bold mb-4">CONTENTS</h6>
        </div>
        <Footer />
    </>
}

export default Home;