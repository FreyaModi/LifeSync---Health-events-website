import React from 'react'
import './cprofile.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Profilepic from './profilepic'

export default function Orgprofile() {

    const [selection, setSelection] = useState('')
    const [name, setName] = useState('')
    const [poc, setPoc] = useState('')
    const [location, setLocation] = useState('')
    const [desc, setDesc] = useState('')
    const [number, setNumber] = useState('')
    const [error, setError] = useState(false)
    const [date, setDate] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    const options1 = [
        { value: "1", label: "Male" },
        { value: "2", label: "Female" },
        { value: "3", label: "Prefer not to say" },
    ];
    const options2 = [
        { value: "1", label: "A+" },
        { value: "2", label: "A-" },
        { value: "3", label: "B+" },
        { value: "4", label: "B-" },
        { value: "5", label: "AB+" },
        { value: "6", label: "AB-" },
        { value: "7", label: "O+" },
        { value: "8", label: "O-" },

    ];
    const options3 = [
        { value: "1", label: "User" },
        { value: "2", label: "Contributer" },

    ];
    const [
        isValid,
        setIsValid
    ] = useState(false);
    const [
        isValidDate,
        setIsValidDate
    ] = useState(false);
    let navigate = useNavigate();


    const handleSubmit = async(e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.persist();

        }
        if (name.length == 0 || location.length <= 0 || number.length <= 10 || desc.length <= 0 || selectedOption === '') {
            setError(true)
            // alert(selection);
        }
        if (name && location && number) {
            // console.log("Email: ", Emailid, "\nPassword: ", Password, "Confirm: ", ConfirmPassword, "Type: ", Type);
            // navigate('/orgprofile')
            //   <Link to='/'></Link>
        }

        const data = {
            "User_id":sessionStorage.getItem("userid"),
            "Org_name": name,
            "Person_contact":poc,
            "User_address":location,
            "User_description":desc,
          
            // "Blood_group":BloodGroup,
            // "User_city":city,
            // "User_pic":image
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
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/updateuser`, settings);


        } catch (error) {
            // Handle error responses here
            console.error('Error:', error);
        }
    }

    // On change effect
    useEffect(() => {
        setIsValid(selection ? true : false);
    }, [selection]);

    useEffect(() => {
        setIsValidDate(date ? true : false);
    }, [date]);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOnClick = (event) => {
        navigate('/cprofile')
    };

    return (
        <div className='c-profile'>
            <div className='row-1'>
                <br></br>
                <h1>Profile</h1>
            </div>
            <div className='field-select'>
                <br></br>
                <button className='btn21' onClick={handleOnClick}> Individual </button>
                <button className='btn12' > Organization</button>
            </div>
            <br></br>
            <div style={{ marginRight: "250px" }}> <h2>Upload your photo:</h2>
                <Profilepic />
            </div>
            <form id='form' className='flex ' onSubmit={handleSubmit}>
                <div className='row-2'>

                    <div className='col-1'>
                        <p style={{ marginLeft: "40px", marginTop: "20px", fontWeight: "600", color: "#3F170E" }}>Organization Name:</p>
                        <input style={{marginLeft:"44px"}} type='text' placeholder='Organization Name' onChange={(e) => setName(e.target.value)} />

                        <br></br>
                        {error && name.length <= 0 ?
                            <label>Name cannot be Empty</label> : ""}

                        <p style={{ marginLeft: "40px", marginTop: "40px", fontWeight: "600", color: "#3F170E" }}>Mobile Number:</p>
                        <br></br>

                        <input style={{marginLeft:"44px"}} type='text' placeholder='Mobile Number' onChange={(e) => setNumber(e.target.value)} />

                        <br></br>
                        <div className='num-error'>
                            {error && number.length <= 10 ?
                                <label>Enter valid Mobile Number</label> : ""} </div>


                        <p style={{ marginLeft: "40px", marginTop: "40px", fontWeight: "600", color: "#3F170E" }}>Person to be contacted:</p>
                        <br></br>
                        <br></br>
                        <input type='text' style={{marginLeft:"44px"}} placeholder='Person to Contact' onChange={(e) => setPoc(e.target.value)} />
                        <br></br>
                        <div className='name-error'>
                            {error && number.length <= 10 ?
                                <label>Enter the name</label> : ""} </div>



                    </div>

                    <div className='col-2'>
                        <p style={{ marginLeft: "55px", fontWeight: "600", color: "#3F170E" }}>Current Addess:</p>
                        <br></br>
                        <textarea rows="2" cols="25" placeholder='Address' onChange={e => setLocation(e.target.value)} />
                        <br></br>
                        <div className='label-2'>
                            {error && location.length <= 0 ?
                                <label>Address cannot be Empty</label> : ""}
                        </div>

                        <p style={{marginLeft:"55px",width:"300px" ,marginTop:"40px", fontWeight:"600",color:"#3F170E"}}>Something about you:</p>
                        <br></br>
                        <br></br>
                        <textarea rows="3" cols="25" placeholder='About Us' onChange={e => setDesc(e.target.value)} />
                        <br></br>
                        <div className='label-2'>
                            {error && desc.length <= 0 ?
                                <label>Description cannot be Empty</label> : ""}</div>

                       <div className='check'><p>Event you want to contribute in:</p></div> 
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className='radio-btn'>
                            <div>
                                <label>
                                    <div className='option-btn-1'>
                                        <input
                                            type="checkbox"
                                            value="Yoga"
                                            checked={selectedOption === 'Yoga'}
                                            onChange={handleOptionChange}
                                        />
                                        Yoga and Exercise Events
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <div className='option-btn-2'>
                                        <input
                                            type="checkbox"
                                            value="Donation"
                                            checked={selectedOption === 'Donation'}
                                            onChange={handleOptionChange}
                                        />
                                        Donation camps
                                    </div>
                                </label>
                            </div>
                            {error && selectedOption === '' ?
                                <label style={{ color: 'red' }}>Choose any one</label> : ""}

                        </div>

                    </div>
                </div>
                <br></br>
                <div className='row-3'>
                    <button className='btn'>Update</button>

                </div>
            </form>
            <br></br>

        </div>



    )
}
