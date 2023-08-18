import React from 'react'
import Profilepic from './profilepic'
import './uploadevent.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { Navigate, json } from 'react-router-dom';
import City from './cities.json';
import Navbar from './navbar'
import data from './cascade.json';

export default function Uploadevent() {

    const data = JSON.parse(JSON.stringify(City)).cityList

    const [selection, setSelection] = useState('')
    const [type, setType] = useState('')
    const [subtype, setsubType] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState('')
    const [org, setOrg] = useState('')
    const [location, setLocation] = useState('')
    const [error, setError] = useState(false)
    const [dateFrom, setDateFrom] = useState(false)
    const [dateTo, setDateTo] = useState(false)
    const [subList, setSubList] = useState([]);
    const [link, setLink] = useState("");

    const eveType = [
        { value: "1", label: "Yoga and Execise" },
        { value: "2", label: "Donation" },
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
    const subType = [
        { value: "1", label: "Yoga" },
        { value: "2", label: "Zumba" },
        { value: "3", label: "Meditation" },
        { value: "4", label: "Exercise" },
        { value: "5", label: "Organ Donation" },
        { value: "6", label: "Blood Donation" },

    ];
    const divStyle = {

    }
    const [
        isValid,
        setIsValid
    ] = useState(false);

    const [
        isValidDate,
        setIsValidDate
    ] = useState(false);
    const [
        isValidSub,
        setIsValidSub
    ] = useState(false);
    const [
        IsValidDateTo,
        setIsValidDateTo
    ] = useState(false);

    const [
        IsValidType,
        setIsValidType
    ] = useState(false);

    const handleSubmit = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            e.persist();

        }
        if (name.length == 0 || location.length <= 0) {
            setError(true)
            // alert(selection);
        }
        if (name && location) {
            // console.log("Email: ", Emailid, "\nPassword: ", Password, "Confirm: ", ConfirmPassword, "Type: ", Type);
            <Navigate to='/'></Navigate>
            //   <Link to='/'></Link>
        }
    }

    // On change effect
    useEffect(() => {
        setIsValid(selection ? true : false);
    }, [selection]);
    useEffect(() => {
        setIsValidType(type ? true : false);
    }, [type]);
    useEffect(() => {
        setIsValidDate(dateFrom ? true : false);
    }, [dateFrom]);
    useEffect(() => {
        setIsValidSub(subtype ? true : false);
    }, [subtype]);
    useEffect(() => {
        setIsValidDateTo(dateTo ? true : false);
    }, [dateTo]);

/////////////////////////////////////////////////////////////////////

// handle change event of the country dropdown
const handleTypeChange = (obj) => {
    setType(obj);
    setSubList(obj.languages);
    setsubType(null);
  };
  
  // handle change event of the language dropdown
  const handleSubChange = (obj) => {
    setsubType(obj);
  };

  

/////////////////////////////////////////////////////////////////////

    return (
        <div>
            <Navbar />

            <div className='upload-event'>

                <div className='rows-1'>
                    <br></br>
                    <h1>Suggest an event:</h1>
                </div>

                <form id='form' className='flex ' onSubmit={handleSubmit}>
                    <div className='rows-2'>

                        <div className='cols-1'>
                            <p style={{ marginLeft: "60px", marginTop: "30px", fontWeight: "700", color: "#3F170E" }}>Event Name:</p>

                            <input type='text' placeholder='Event Name' onChange={(e) => setName(e.target.value)} />
                            <div className='label-12'> {error && name.length <= 0 ?
                                <label style={{ marginTop: "-50px" }}>Name cannot be Empty</label> : ""}</div>


                            <p style={{ marginLeft: "60px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Organizer Name:</p>

                            <input type='text' placeholder='Organizer Name' onChange={(e) => setOrg(e.target.value)} style={{ marginTop: "55px" }} />

                            <div className='label-12'> {error && org.length <= 0 ?
                                <label style={{ marginLeft: "190px", marginTop: "-50px" }}>Organizer Name cannot be Empty</label> : ""}</div>
                            <br></br>
                            <br></br>


                            <p style={{ marginLeft: "60px", marginTop: "-20px", fontWeight: "700", color: "#3F170E" }}>About the event:</p>

                            <textarea rows={3} cols={22} placeholder='About the event' style={{ marginLeft: "60px", marginTop: "15px" }} onChange={e => setDesc(e.target.value)} />
                            <br></br>
                            <div className='label-12'>
                                {error && desc.length <= 0 ?
                                    <label style={{ marginTop: "-33px" }}>This cannot be Empty</label> : ""}
                            </div>

                            <p style={{ marginLeft: "60px", marginTop: "25px", fontWeight: "700", color: "#3F170E" }}>Select event type:</p>
                            <Select className='selection3'
                                options={eveType}
                                onChange={(e) => setType(e.value)}
                                value={eveType.filter(function (option) {
                                    // console.log(option, )
                                    return option.value === type;
                                })}
                                label="Select option"
                                placeholder={"Event Type"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!IsValidType && <p style={{ color: 'red', marginTop: "-10px", marginLeft: "200px" }}>Please select an option... </p>}

                            <p style={{ marginLeft: "60px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Select Subevent type:</p>
                            <Select className='selection4'
                                options={subType}
                                onChange={(e) => setsubType(e.value)}
                                value={subType.filter(function (option) {
                                    // console.log(option, )
                                    return option.value === subtype;
                                })}
                                label="Select option"
                                placeholder={"Sub Type"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!IsValidType && <p style={{ color: 'red', marginTop: "-10px", marginLeft: "200px" }}>Please select an option... </p>}

                            <p style={{ marginLeft: "60px", marginTop: "65px", fontWeight: "700", color: "#3F170E" }}>Contact Number:</p>
                            <input style={{ marginTop: "100px" }} type='text' placeholder='Contact Number' onChange={(e) => setNumber(e.target.value)} />
                            <div className='label-12'> {error && number.length <= 10 ?
                                <label style={{ color: 'red', marginTop: "-50px", marginLeft: "200px" }}>Mobile number is not valid</label> : ""}</div>

                            <div className='text' style={{ fontWeight: "bold", color: "#3f170e", marginTop: "50px", marginLeft: "60px" }}>Upload Image:</div>
                            <input type="file" placeholder='Choose Image' onChange={(e) => setImg(e.target.value)} style={{ marginTop: "10px" }} />
                        </div>
                        {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}

                        <div className='cols-2'>
                            <div className='date-duration'>

                                <p style={{ marginLeft: "70px", marginTop: "30px", fontWeight: "700", color: "#3F170E" }}>Select the dates:</p>
                                <input style={{ marginLeft: "70px", marginTop: "65px" }} type='date' placeholder='From' onChange={(e) => setDateFrom(e.target.value)} />

                                <input style={{ marginTop: "65px" }} type='date' placeholder='To' onChange={(e) => setDateTo(e.target.value)} />

                                {console.log(IsValidDateTo, "date to")}
                                {console.log(isValidDate, "date from")}
                                <div className='dob-error'>{!isValidDate && !IsValidDateTo ? <p style={{ color: 'red', marginTop: "80px" }}>Please select the Date... </p> : ""}
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className='time-duration'>
                                <p style={{ marginLeft: "70px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Select Time Duration:</p>

                                <input style={{ marginLeft: "70px", marginTop: "50px" }} type='time' placeholder='From' onChange={(e) => setDateFrom(e.target.value)} />

                                <input style={{ marginTop: "50px" }} type='time' placeholder='To' onChange={(e) => setDateTo(e.target.value)} />

                                <div className='dob-error'>{!isValidDate && !IsValidDateTo ? <p style={{ color: 'red', marginTop: "80px" }}>Please select the time... </p> : ""}  </div>
                                {/* <div className='dob-error'>{dateFrom>=dateTo ? <p style={{ color: 'red', marginTop:"80px" }}>Incorrect selection... </p> : ""}
                                </div> */}
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className='duration'>\

                                <p style={{ marginLeft: "70px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Registration end Date:</p>

                                <input style={{ marginLeft: "70px", marginTop: "55px", height: "45px", width: "470px" }} type='datetime-local' placeholder='From' onChange={(e) => setDateFrom(e.target.value)} />
                                <div className='dob-error'>{!isValidDate && !IsValidDateTo ? <p style={{ color: 'red', marginTop: "65px" }}>Please select the time... </p> : ""}
                                </div>
                            </div>

                            <p style={{ marginLeft: "70px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Select Time Duration:</p>

                            <Select className='selection2'
                                options={data}
                                onChange={(e) => setSelection(e.value)}
                                value={data.filter(function (option) {
                                    // console.log(option, )
                                    return option.value === selection;
                                })}
                                label="Select option"
                                placeholder={"City"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!isValid && <p style={{ color: 'red' }}>Please select an option... </p>}

                            <p style={{ marginLeft: "70px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Area:</p>

                            <input type='text' style={{ marginLeft: "55px", marginTop: "95px"}} placeholder='Area' onChange={e => setLocation(e.target.value)} />
                            <br></br>
                            <div className='label-12'>
                                {error && location.length <= 0 ?
                                    <label>Area cannot be Empty</label> : ""}
                            </div>
                            <p style={{ marginLeft: "70px", marginTop: "90px", fontWeight: "700", color: "#3F170E" }}>Address:</p>
                            <textarea style={{ marginLeft: "55px", marginTop: "125px"}} rows={3} cols={22} placeholder='Address' onChange={e => setAddress(e.target.value)} />
                            <br></br>
                            <div className='label-12'>
                                {error && address.length <= 0 ?
                                    <label style={{ marginTop: "-20px" }}>Address cannot be Empty</label> : ""}
                            </div>
                        </div>
                    </div>

                    <div className='rows-3'>
                        <button className='btn'> Submit</button> </div>



                    <br></br>
                </form>
                <br></br>
            </div>
        </div>
    )
}


            // await axios.post('https://localhost:44324/api/Event/insertuser', {
            //     User_emailid:Emailid, 
            //     Password:Password,
            //     User_type:selection

            // });         
            // Request was successful, handle the response here
            // console.log('Response data:', response.data);
            // if (response.ok) {
            //     // Request was successful, handle the response data here (if any)
            //     const responseData = await response.json();
            //     console.log('Response data:', responseData);
            //   } else {
            //     // Request failed, handle the error here
            //     console.error('Request failed:', response.status, response.statusText);
            //   }


