import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Item from './item';

function Home() {
    
    const photos = [require("../Photos/asgarali.png"), require("../Photos/united.png"), require("../Photos/square.png"), require("../Photos/popular.png"),require("../Photos/ibn.jpg"),require("../Photos/labaid.jpg"),require("../Photos/birdem.png")]; // Add the paths of your photos here
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % photos.length); // Move to the next slide
      }, 3000);
  
      return () => {
        clearInterval(interval);
      };
    }, [photos.length]);
    
    const features = [
        {
          id: 1,
          name: 'Excellent Service',
          description: 'At ShashtoSeba, our utmost priority is to deliver clinical excellence as a healthcare service provider. We are committed to providing the highest standard of medical care, combining professional clinical expertise with exceptional personal service. Our focus is on ensuring that every aspect of our healthcare services reflects excellence, both in terms of the clinical treatment provided and the individualized attention and care given to each patient. At ShashtoSeba, we strive to achieve the perfect balance between clinical excellence and outstanding personal service, ensuring that our patients receive the best possible healthcare experience.',
        },
        {
          id: 2,
          name: 'Expert Medical Professionals',
          description: 'Our experienced and highly skilled medical professionals are dedicated to delivering exceptional healthcare services.',
        },
        {
          id: 3,
          name: 'Comprehensive Range of Services',
          description: 'From diagnostics to surgeries, we offer a comprehensive range of medical services to meet all your healthcare needs.',
        },
        {
          id: 4,
          name: 'Patient-Centered Approach',
          description: 'We prioritize patient comfort and well-being, ensuring personalized care and attention throughout the treatment process.',
        },
      ];
    
      const [expandedFeature, setExpandedFeature] = useState(null);
    
      const handleFeatureClick = (featureId) => {
        if (expandedFeature === featureId) {
          setExpandedFeature(null);
        } else {
          setExpandedFeature(featureId);
        }

  };

    return <>
        <Navbar />
        <div class="home">
  <div class="column">
        <div style={{marginTop:"80px"}}>
            <img
              src="https://img.freepik.com/premium-photo/medicine-doctor-hand-working-with-modern-computer-interface_103164-5.jpg?w=1060"
              alt="home"
                width={"100%"}
                height={"45%"}
            ></img>
            </div>
  </div>
  <div class="column">
  <div className='container' style={{marginTop:"200px"}}><center><a className="navbar-brand text-dark" href="/"><b>
          <h3 class="homeh">OUR SPECIAL HOSPITALS</h3>
        <div style={{marginTop:"50px"}}>
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Slide ${index + 1}`}
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        />
      ))}
    </div>
    </b>
        </a>
        </center>
        </div>
  </div>
  </div>
  
  <h4 className='homeh'><center><FontAwesomeIcon icon={faEnvelope} /> <a className="text-decoration-none" href='mailto:shasthoseba.app@gmail.com'><strong className='homeh'>shasthoseba.app@gmail.com</strong></a> </center></h4> 
  
  <div>
  <div className='details'>
  <div className="cardlog" id = "contid" style={{marginTop:"100px"}}>
       <center><h3 class="homeh"><u>WHY CHOOSE US?</u></h3></center> 
        <br></br>
      <div className="features">
        {features.map((feature) => (
          <div key={feature.id} className="feature">
          <br></br>
          <center><h3 className='homeh' onClick={() => handleFeatureClick(feature.id)}> {feature.name} <FontAwesomeIcon icon={faCaretDown} /> </h3> </center>
            {expandedFeature === feature.id && <p>{feature.description}</p>}
          </div>
        ))}
      </div>
    </div>
    </div>
            
            <div class="containertext">
            <br></br>
            <br></br>
            <h3 className='text-white'>WE CARE YOUR HEALTH AND CHECKUP WITH BEST</h3>
            <br></br>
            <h5 className='text-light'>ShashthoSeba boasts a comprehensive array of cutting-edge medical technologies. Our collection of advanced machinery is specifically crafted with meticulous attention to rigorous safety standards. These state-of-the-art tools are instrumental in facilitating accurate diagnoses and effective treatments for various medical conditions. Each piece of equipment is carefully selected to ensure optimal functionality and performance. By incorporating these advanced technologies into our healthcare practices, we enhance our ability to address medical issues with precision and deliver superior care to our patients.</h5>
            </div>

            <div className='containertime'>
            <iframe
              width="500"
              height="300"
              src="https://dayspedia.com/if/digit/?v=1&iframe=eyJ3LTEyIjp0cnVlLCJ3LTExIjp0cnVlLCJ3LTEzIjp0cnVlLCJ3LTE0IjpmYWxzZSwidy0xNSI6ZmFsc2UsInctMTEwIjpmYWxzZSwidy13aWR0aC0wIjpmYWxzZSwidy13aWR0aC0xIjp0cnVlLCJ3LXdpZHRoLTIiOmZhbHNlLCJ3LTE2IjoiMjRweCIsInctMTkiOiI0OCIsInctMTciOiIxNiIsInctMjEiOnRydWUsImJnaW1hZ2UiOjAsImJnaW1hZ2VTZXQiOnRydWUsInctMjFjMCI6IiNmZmZmZmYiLCJ3LTAiOnRydWUsInctMyI6ZmFsc2UsInctM2MwIjoiIzM0MzQzNCIsInctM2IwIjoiMSIsInctNiI6IiMzNDM0MzQiLCJ3LTIwIjp0cnVlLCJ3LTQiOiIjMDAwMDAwIiwidy0xOCI6ZmFsc2UsInctd2lkdGgtMmMtMCI6IjUwMCIsInctMTE1IjpmYWxzZX0=&lang=en&cityid=9611"
            ></iframe>
            </div>

  </div>
        <Footer />
    </>
}

export default Home;
