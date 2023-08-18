import React from 'react'
import { Link } from "react-router-dom"
import iconImg from '../assets/logo-transparent-png.png';
import profileImg from '../assets/profile.png';
import Yogaevents from './yogaevents';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function Navbar1() {
    let navigate=useNavigate();
    const options = [
        { value: "1", label: "My Profile" },
        { value: "2", label: "LogOut" },
      
    ];

    const [selection, setSelection] = useState('')

  const handleSubmit=()=>{
    navigate('../login')
  }

    return (
        <div className='navbar1'>
            <header>

                <h3> <img src={iconImg} /></h3>

                <nav>
                    <Link>Home</Link>
                    <Link>About Us</Link>
                    <Link >Yoga</Link>
                    <Link >Donation</Link>
                    <Link >Activities</Link>
                </nav>
                <div className='login-option'>
                <button  className='btn' onClick={handleSubmit}>LogIn</button>

                </div>

            </header>
        </div>
    )
}
