import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {

  return (
    <footer className="color-nav bd-footer py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <a className="d-inline-flex align-items-center mb-2 link-light text-decoration-none" href="/" aria-label="Bootstrap">
                <span className="fs-5">ShasthoSeba</span>
            </a>
            <ul className="list-unstyled small text-light">
              <li className="mb-2">Designed and built with all the love in the world by the <a href="/docs/5.0/about/team/" style={{color: "white", textDecoration: "none"}}>HECTIC ROBO Team</a>.</li>
              <li className="mb-2">Copyright © 2022 ShasthoSeba</li>
            </ul>
          </div>
          <div className="col-6 col-lg-3 offset-lg-1 mb-3">
            <h5 className="h-text">Popular Locations</h5>
            
          </div>
          <div className="col-6 col-lg-3 mb-3">
            <h5 className="h-text">Popular Diagnostic Tests</h5>
            
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5 className="h-text">Follow Us</h5>
            <ul className="list-unstyled d-flex">
                          
              
              <li className="mb-2"><a style={{color: "white", textDecoration: "none"}} href="https://m.facebook.com/login/?locale=en_GB">
                <i className="me-3">
                  <FontAwesomeIcon icon={faFacebook} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "white", textDecoration: "none"}} href="https://www.instagram.com/accounts/login/?__coig_restricted=1">
                <i className="me-3">
                  <FontAwesomeIcon icon={faInstagram} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "white", textDecoration: "none"}} href="https://twitter.com/i/flow/login">
                <i className="me-3">
                  <FontAwesomeIcon icon={faTwitter} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "white", textDecoration: "none"}} href="https://www.linkedin.com/login">
                <i className="me-3">
                  <FontAwesomeIcon icon={faLinkedin} />
                </i>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
  
}

export default Footer;