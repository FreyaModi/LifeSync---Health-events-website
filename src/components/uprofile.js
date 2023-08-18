import React from 'react'
import Profilepic from './profilepic'
import './profile.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { Navigate, json } from 'react-router-dom';
import City from './cities.json';
import { useNavigate } from "react-router-dom";

export default function Uprofile() {
    const navigate = useNavigate();
    const data = JSON.parse(JSON.stringify(City)).cityList

    const [selection, setSelection] = useState('')
    const [city, setCity] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [error, setError] = useState(false)
    const [date, setDate] = useState(false)
    const[image,setImage]=useState("");

    const options1 = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Prefer not to say", label: "Prefer not to say" },
    ];
    const options2 = [
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },

    ];

    const [
        isValid,
        setIsValid
    ] = useState(false);
    const [
        isValidDate,
        setIsValidDate
    ] = useState(false);
    const [
        isValidCity,
        setIsValidCity
    ] = useState(false);

    const [
        isValidbg,
        setIsValidbg
    ] = useState(false);


    const handleSubmit = async (e) => {

        if (e && e.preventDefault) {
            e.preventDefault();
            e.persist();

        }
        console.log("name: ", name, "\city: ", city, "blood group: ", BloodGroup, "loaction: ", location,"image: ",image,"dob: ",date,"gender: ",selection);
        const data = {
            "User_id":sessionStorage.getItem("userid"),
            "User_name": name,
            "User_dob": date,
            "Gender": selection,
            "User_address":location,
            "Blood_group":BloodGroup,
            "User_city":city,
            "User_pic":image
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
        if (name.length == 0 || location.length <= 0) {
            setError(true)
            // alert(selection);
        }
        if (name && selection && date && location && city && BloodGroup) {
            // console.log("Email: ", Emailid, "\nPassword: ", Password, "Confirm: ", ConfirmPassword, "Type: ", Type);
            navigate('/home');
            //   <Link to='/'></Link>
        }
    }

    // On change effect
    useEffect(() => {
        setIsValid(selection ? true : false);
    }, [selection]);

    useEffect(() => {
        setIsValidDate(date ? true : false);
    }, [date]);

    useEffect(() => {
        setIsValidCity(city ? true : false);
    }, [city]);

    useEffect(() => {
        setIsValidbg(BloodGroup ? true : false);
    }, [BloodGroup]);

    return (
        <div className='user-profile'>
            <div className='row-1'>
                <br></br>
                <h2>Upload your profile:</h2>
                <Profilepic image={image} setImage={setImage} />
            </div>
            <form id='form' className='flex ' onSubmit={handleSubmit}>
                <div className='row-2'>

                    <div className='col-1'>
                        <p style={{ marginLeft: "-30px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Full Name:</p>
                        <input type='text' placeholder='Full Name' onChange={(e) => setName(e.target.value)} />

                        <br></br>
                        {error && name.length <= 0 ?
                            <label style={{ marginLeft: "-80px" }}>Name cannot be Empty</label> : ""}

                        <p style={{ marginLeft: "-30px", marginTop: "40px", fontWeight: "700", color: "#3F170E" }}>Date Of Birth:</p>
                        <br></br>

                        <input type='date' placeholder='DOB' style={{ marginTop: "70px" }} onChange={(e) => setDate(e.target.value)} />
                        <div className='dob-error'>{!isValidDate && <p style={{ color: 'red' }}>Please select the Date... </p>}
                        </div>


                        <p style={{ marginLeft: "-30px", marginTop: "40px", fontWeight: "700", color: "#3F170E" }}>Gender:</p>
                        <br></br>
                        <Select className='selection1'
                            options={options1}
                            onChange={(e) => setSelection(e.value)}

                            value={options1.filter(function (option) {
                                // console.log(option, )
                                return option.value === selection;
                            })}
                            label="Select option"
                            placeholder={"Gender"}
                            menuPlacement="bottom"
                        // required
                        />
                        {!isValid && <p style={{ color: 'red' }}>Please select an option... </p>}

                    </div>
                    <div className='col-2'>
                        <p style={{ marginLeft: "55px", fontWeight: "700", color: "#3F170E" }}>Current Addess:</p>
                        <br></br>
                        <input type='text' placeholder='Address' onChange={e => setLocation(e.target.value)} />
                        <br></br>
                        <div className='label-2'>
                            {error && location.length <= 0 ?
                                <label>Address cannot be Empty</label> : ""}
                        </div>

                        {/* <Select className='selection2'
                            {...data.map((data) => {
                                return (<option key={data.id} value={data.id}>{data.name}</option>
                                )
                            })}
                        /> */}
                        <br></br>
                        <p style={{ marginLeft: "55px", fontWeight: "700", color: "#3F170E" }}>Select City:</p>

                        <Select className='selection2'
                            options={data}
                            onChange={(e) => setCity(e.value)}
                            value={data.filter(function (option) {
                                // console.log(option, )
                                return option.value === city;
                            })}
                            label="Select option"
                            placeholder={"City"}
                            menuPlacement="bottom"
                        // required
                        />


                        {!isValidCity && <p style={{ color: 'red' }}>Please select an option... </p>}


                        <br></br>
                        <p style={{ marginLeft: "55px", marginTop: "55px", fontWeight: "700", color: "#3F170E" }}>Select your blood group:</p>

                        <Select className='selection3'
                            options={options2}
                            onChange={(e) => setBloodGroup(e.value)}
                            value={options2.filter(function (option) {
                                // console.log(option, )
                                return option.value === BloodGroup;
                            })}
                            label="Select option"
                            placeholder={"Blood Group"}
                            menuPlacement="bottom"
                        // required
                        />
                        {!isValidbg && <p style={{ color: 'red' }}>Please select an option... </p>}

                    </div>
                </div>
                <br></br>
                <br></br>
                <div className='row-3'>
                    <button className='btn'> Submit</button>

                </div>
            </form>
            <br></br>

        </div>



    )
}
