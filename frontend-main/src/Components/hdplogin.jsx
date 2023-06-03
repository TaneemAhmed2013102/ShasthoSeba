import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const LoginPage = () => {
    return (
        <>
        <Navbar />
        <div className="containerlog">
          <div className="cardlog">
            <h2>Are you a Doctor?</h2>
            <br></br>
            <center>
            <a href="/Doctor/doclogin" className="text-decoration-none">
                    <strong className="text-success">Login</strong>
                  </a>
                        </center>   
                  <p className="mt-4 text-center">
                  Don't have an account?{" "}
                  <a href="/Doctor/docreg" className="text-decoration-none">
                    <strong className="text-danger">Register</strong>
                  </a>
                </p>
          
          </div>
          <div className="cardlog">
            <h2>A Hospital?</h2>
            <br></br>
            <center>
            <a href="/login" className="text-decoration-none">
                    <strong className="text-success">Login</strong>
                  </a>
                        </center>   
                  <p className="mt-4 text-center">
                  Don't have an account?{" "}
                  <a href="/register" className="text-decoration-none">
                    <strong className="text-danger">Register</strong>
                  </a>
                </p>
          
          </div>
          <div className="cardlog">
            <h2>Are you a Patient?</h2>
            <br></br>
            <center>
            <a href="/Patient/patLogin" className="text-decoration-none">
                    <strong className="text-success">Login</strong>
                  </a>
                        </center>   
                  <p className="mt-4 text-center">
                  Don't have an account?{" "}
                  <a href="/Patient/patientReg" className="text-decoration-none">
                    <strong className="text-danger">Register</strong>
                  </a>
                </p>
          </div>
        </div>
        <Footer />
        </>
      );
};

export default LoginPage;
