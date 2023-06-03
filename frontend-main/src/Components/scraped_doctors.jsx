import React, { useState, useEffect } from 'react'

const DoctorList = () => {

    const [doctors, setDoctors] = useState([]);
    const [anesDoctors, setAnesDoctors] = useState([]);
    
    useEffect(() => {
        fetch('http://127.0.0.1:8091/app/doctors_list')
            .then((response) => response.json())
            .then((data) => setDoctors(data.doctors));
    }, []);


    useEffect(() => {
        fetch('http://127.0.0.1:8091/app/anesthesilogy')
            .then((response) => response.json())
            .then((data) => setAnesDoctors(data.anesDoctors));
    }, []);
    

    return(
        <div>
            <ul className="doctor-list">
                {doctors.map((doctor) => (
                    <li className='list' key={doctor.id}>
                        <div>
                            <img src={doctor.image_path} alt={doctor.name} width="150" height="200" />
                            <h2>{doctor.name}</h2>
                            <p>{doctor.degree}</p>
                            <p>Specialist:{doctor.specialist}</p>
                        </div>    
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;