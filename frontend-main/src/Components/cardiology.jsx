import React, { useState, useEffect } from 'react'

const CardiacDoctorList = () => {

    const [doctors, setDoctors] = useState([]);
    

    useEffect(() => {
        fetch('http://127.0.0.1:8091/app/cardiology')
            .then((response) => response.json())
            .then((data) => setDoctors(data.doctors));
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

export default CardiacDoctorList;