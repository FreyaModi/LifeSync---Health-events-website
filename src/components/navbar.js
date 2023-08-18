import React from 'react'
import { Link } from "react-router-dom"
import iconImg from '../assets/logo-transparent-png.png';
import profileImg from '../assets/profile.png';

import { useState, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    let navigate = useNavigate();
    const options = [
        { value: "1", label: "My Profile" },
        { value: "2", label: "LogOut" },

    ];

    const [selection, setSelection] = useState('')

const handlelogOut=async()=>{
   
    const data = {
        "User_id":sessionStorage.getItem("userid"),
        
    };

    const settings = {
        method: 'POST',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }


    try {
        console.log(process.env.REACT_APP_API_URL, "uyuy")
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/logout`, settings);


    } catch (error) {
        // Handle error responses here
        console.error('Error:', error);
    }
}
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className='navbar1'>
            <header>

                <h3> <img src={iconImg} /></h3>

                <nav>
                    <Link to='/home'>Home</Link>
                    <Link to='/aboutus'>About Us</Link>
                    <Link to='/yogaevents' >Yoga</Link>
                    <Link to='/donationevents'>Donation</Link>
                    <Link to='/registered'>Activities</Link>
                </nav>
                <div className='icon-2'>
                    <img
                        src={profileImg}
                        alt="Dropdown Image"
                        onClick={toggleDropdown}
                    />
                    {isOpen && (
                        <div className="dropdown-content" style={{ backgroundColor: "white", width: "120px", marginTop: "130px", marginLeft: "-30px", borderStartEndRadius: "20px", borderEndEndRadius: "20px", borderEndStartRadius: "20px",zIndex:1 }}>
                            {/* Dropdown content */}
                            <ul>

                                <li><Link to='/uprofile'>Profile</Link> </li>
                                <br></br>
                               <li> <Link to='/' onClick={handlelogOut}>Log Out</Link> </li>
                            </ul>
                        </div>
                    )}
                </div>

            </header>
        </div>
    )
}
