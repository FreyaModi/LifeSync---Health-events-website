import React from 'react'
import Profilepic from './profilepic'
import './uploadevent.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { Navigate, json } from 'react-router-dom';
import City from './cities.json';
import Navbar from './navbar'
import evedata from './cascade.json';
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';

export default function Uploadevent() {

    const data = JSON.parse(JSON.stringify(City)).cityList

    const [city, setcity] = useState('')
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
    const [timeFrom, settimeFrom] = useState(false)
    const [timeTo, settimeTo] = useState(false)
    const [deadline, setDeadline] = useState(false)
    const [subList, setSubList] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [seatOption, setSeatOption] = useState('');


    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');

    const eveType = [
        { value: "Yoga and Exercise", label: "Yoga and Exercise" },
        { value: "Donation", label: "Donation" },
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
        isValidtime,
        setIsValidtime
    ] = useState(false);
    const [
        IsValidtimeTo,
        setIsValidtimeTo
    ] = useState(false);

    const [
        IsValidType,
        setIsValidType
    ] = useState(false);
    const [
        IsValiddeadline,
        setIsValiddeadline
    ] = useState(false);


// const[fileUpload,setFileupload]=useState('');
//     const handleFileChange = (files) => {
//         // Retrieve the selected file from the input element
//       let selectedFiles=[];
//       if(files.length===0){
//         return;
//       }
//         for(let i=0;i<files.length;i++){
// selectedFiles.push(files[i]);
        
//       }
//       const formData=new FormData();
//       selectedFiles.forEach((f)=>formData.append('files',f));
//     //  selectedFiles.forEach((f)=>formData.append('eve',f));
//       setFileupload=formData;
//     };


    const handleFileChange = (event) => {
        // Retrieve the selected file from the input element
        const file = event.target.files[0];
        if (file && file instanceof Blob) {
            setImg(file);
        } else {
            console.error('Invalid file selected.');
        }
    };

    //const [base64Result, setBase64Result] = useState(null);

    // function getBase64(file, cb) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         cb(reader.result)
    //         console.log(file)
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }

    // const handleFileChange = (event) => {
    //     const selectedFile = event.target.files[0];
    //     console.log("hello")
    //     if(selectedFile && selectedFile instanceof Blob){
    //     getBase64(selectedFile, function(base64Result) {
    //         setBase64Result(base64Result);
    //         console.log(base64Result,"result")
    //         console.log("hi")
            
    //     }
    //     );
    // }
    //}
    const handleSubmit = async (e) => {

        e.preventDefault();
        e.persist();


        if (name.length == 0 || location.length <= 0) {
            setError(true)
            // alert(city);
        }
        if (name && org && dateFrom) {
            console.log("event name: ", name, "event_org: ", org, "date from: ", dateFrom);
            <Navigate to='/'></Navigate>
            //   <Link to='/'></Link>
        }
        const data = {
            "User_id": sessionStorage.getItem("userid"),
            "Event_name": name,
            "Event_org": org,
            "Date_from": dateFrom,
            "Date_to": dateTo,
            "Duration_from": timeFrom,
            "Duration_to": timeTo,
            "Event_deadline": deadline,
            "Event_des": desc,
            "Event_address": address,
            "Event_city": city,
            "Event_area": location,
            "Event_type": type.event_code,
            "Sub_type": subtype.code,
            "Event_seats": seatOption,
            //    "UploadFile":img
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

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/insertevent`, settings);
            const eventid = await response.json();
            sessionStorage.setItem("eventid", eventid);

        } catch (error) {
            // Handle error responses here
            console.error('Error:', error);
        }
        ////////////////////////////////////////////////////////////////////
        const eventID = sessionStorage.getItem('eventid');
        const formData = new FormData();   
        formData.append('file', img);
        formData.append('event_id', eventID);
        console.log(formData,'212');
        const settings1 = {
            method: 'POST',
           
                'Content-Type': 'multipart/form-data', // Corrected Content-Type header
          
            body: formData,
            
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/coverimg`, settings1);

            if (response.ok) {
                const data1 = await response.json();
                console.log('Upload successful:', data1);
            } else {
                console.error('Upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // On change effect
    useEffect(() => {
        setIsValid(city ? true : false);
    }, [city]);
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


    useEffect(() => {
        setIsValidtime(timeFrom ? true : false);
    }, [timeFrom]);

    useEffect(() => {
        setIsValidtimeTo(timeTo ? true : false);
    }, [timeTo]);


    useEffect(() => {
        setIsValiddeadline(deadline ? true : false);
    }, [deadline]);
    //------------------ADD MORE------------------------------------------------
    const [val, setVal] = useState([]);
    const handleAdd = () => {
        const abc = [...val, []]
        console.log(abc, "handle add")
        setVal(abc)
    }
    const handleChange = (onChangeValue, i) => {
        console.log(onChangeValue.target.value)
        const inputdata = [...val]
        inputdata[i] = onChangeValue.target.value;

        setVal(inputdata)
    }
    const handleDelete = (i) => {
        const deletVal = [...val]
        deletVal.splice(i, 1)
        setVal(deletVal)
    }
    console.log(val, "data-")

    //---------------------------------------------------------------------------


    //////////////////////////////////////////////////////////////////////


    //  const  fileSelectedHandler = (e) => {
    //     setImg({ files: [...img.files, ...e.target.files] })
    //   }

    /////////////////////////////////////////////////////////////////////

    // handle change event of the country dropdown
    const handleTypeChange = (obj) => {
        setType(obj);
        setSubList(obj.subtypes);
        setsubType(null);
    };

    // handle change event of the language dropdown
    const handleSubChange = (obj) => {
        setsubType(obj);
    };



    /////////////////////////////////////////////////////////////////////
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    ///////////////////////////////////////////////////////////////
    const handleSeatChange = (e) => {
        setSeatOption(e.target.value);

    }
    return (
        <div>
            <Navbar />

            <div className='upload-event'>

                <div className='rows-1'>
                    <br></br>
                    <h1>Suggest an event:</h1>
                </div>

                <form id='form' className='flex ' onSubmit={handleSubmit} action="/upload" method="post" enctype="multipart/form-data">
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
                            <Select className='city3'
                                value={type}
                                options={evedata}
                                onChange={handleTypeChange}
                                getOptionLabel={x => x.evestype}
                                getOptionValue={x => x.event_code}
                                // value={eveType.filter(function (option) {
                                //     // console.log(option, )
                                //     return option.value === type;
                                // })}
                                label="Select option"
                                placeholder={"Event Type"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!IsValidType && <p style={{ color: 'red', marginTop: "-10px", marginLeft: "200px" }}>Please select an option... </p>}

                            <p style={{ marginLeft: "60px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Select Subevent type:</p>
                            <Select className='city4'
                                value={subtype}
                                options={subList}
                                onChange={handleSubChange}
                                getOptionLabel={x => x.sub}
                                getOptionValue={x => x.code}
                                // value={subType.filter(function (option) {
                                //     // console.log(option, )
                                //     return option.value === subtype;
                                // })}
                                label="Select option"
                                placeholder={"Sub Type"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!IsValidType && <p style={{ color: 'red', marginTop: "-10px", marginLeft: "200px" }}>Please select an option... </p>}
                            <div className='mobile-number'>
                                <p style={{ marginLeft: "60px", marginTop: "65px", fontWeight: "700", color: "#3F170E" }}>Contact Number:</p>
                                <input style={{ marginTop: "100px" }} type='text' placeholder='Contact Number' onChange={(e) => setNumber(e.target.value)} />
                                <button className='btn+' onClick={() => handleAdd()}>+</button>
                            </div>
                            {val.map((data, i) => {
                                return (
                                    <div className='extras'>
                                        <input value={data} onChange={e => handleChange(e, i)} />
                                        <button onClick={() => handleDelete(i)}>x</button>
                                    </div>
                                )
                            })}

                            <br></br>
                            <div className='label-12'> {error && number.length <= 10 ?
                                <label style={{ color: 'red', marginTop: "-50px", marginLeft: "200px" }}>Mobile number is not valid</label> : ""}</div>

                            <div className='text' style={{ fontWeight: "bold", color: "#3f170e", marginTop: "50px", marginLeft: "60px" }}>Upload Cover Image:</div>
                            <input type="file" multiple placeholder='Choose Image' onChange={handleFileChange} style={{ marginTop: "10px" }} />
{/* 
                            <div className='text' style={{ fontWeight: "bold", color: "#3f170e", marginTop: "50px", marginLeft: "60px" }}>Upload more Images:</div>
                            <input type="file" multiple placeholder='Choose Image' onChange={handleFileChange} style={{ marginTop: "10px" }} /> */}
                        </div>

                        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                        <div className='cols-2'>
                            <div className='date-duration'>

                                <p style={{ marginLeft: "70px", marginTop: "30px", fontWeight: "700", color: "#3F170E" }}>Select the dates:</p>
                                <input style={{ marginLeft: "70px", marginTop: "65px" }} type='date' placeholder='From' onChange={(e) => setDateFrom(e.target.value)} />

                                <input style={{ marginTop: "65px" }} type='date' placeholder='To' onChange={(e) => setDateTo(e.target.value)} />
                                {/* 
                                {console.log(IsValidDateTo, "date to")}
                                {console.log(isValidDate, "date from")} */}
                                <div className='dob-error'>{!isValidDate || !IsValidDateTo ? <p style={{ color: 'red', marginTop: "80px" }}>Please select the Date... </p> : ""}
                                </div>
                                <div className='dob-error'>{isValidDate < IsValidDateTo ? <p style={{ color: 'red', marginTop: "80px" }}>Please select the Date... </p> : ""}
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className='time-duration'>
                                <p style={{ marginLeft: "70px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Select Time Duration:</p>

                                <input style={{ marginLeft: "70px", marginTop: "50px" }} type='time' placeholder='From' onChange={(e) => settimeFrom(e.target.value)} />

                                <input style={{ marginTop: "50px" }} type='time' placeholder='To' onChange={(e) => settimeTo(e.target.value)} />

                                <div className='dob-error'>{!isValidtime || !IsValidtimeTo ? <p style={{ color: 'red', marginTop: "80px" }}>Please select the time... </p> : ""}  </div>
                                {/* <div className='dob-error'>{dateFrom>=dateTo ? <p style={{ color: 'red', marginTop:"80px" }}>Incorrect city... </p> : ""}
                                </div> */}
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className='duration'>

                                <p style={{ marginLeft: "70px", marginTop: "20px", fontWeight: "700", color: "#3F170E" }}>Registration end Date:</p>

                                <input style={{ marginLeft: "70px", marginTop: "55px", height: "45px", width: "470px" }} type='datetime-local' placeholder='From' onChange={(e) => setDeadline(e.target.value)} />
                                <div className='dob-error'>{!IsValiddeadline ? <p style={{ color: 'red', marginTop: "75px", marginLeft: "200px" }}>Please select  registration deadline... </p> : ""}
                                </div>
                            </div>

                            <p style={{ marginLeft: "70px", marginTop: "70px", fontWeight: "700", color: "#3F170E" }}>City:</p>

                            <Select className='city2'
                                options={data}
                                onChange={(e) => setcity(e.value)}
                                value={data.filter(function (option) {
                                    // console.log(option, )
                                    return option.value === city;
                                })}
                                label="Select option"
                                placeholder={"City"}
                                menuPlacement="bottom"
                            // required
                            />
                            {!isValid && <p style={{ color: 'red' }}>Please select an option... </p>}

                            <p style={{ marginLeft: "70px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Area:</p>

                            <input type='text' style={{ marginLeft: "55px", marginTop: "95px" }} placeholder='Area' onChange={e => setLocation(e.target.value)} />
                            <br></br>
                            <div className='label-12'>
                                {error && location.length <= 0 ?
                                    <label>Area cannot be Empty</label> : ""}
                            </div>
                            <p style={{ marginLeft: "70px", marginTop: "90px", fontWeight: "700", color: "#3F170E" }}>Address:</p>
                            <textarea style={{ marginLeft: "55px", marginTop: "125px" }} rows={3} cols={22} placeholder='Address' onChange={e => setAddress(e.target.value)} />
                            <br></br>
                            <div className='label-12'>
                                {error && address.length <= 0 ?
                                    <label style={{ marginTop: "-20px" }}>Address cannot be Empty</label> : ""}
                            </div>
                            <p style={{ marginLeft: "70px", marginTop: "60px", fontWeight: "700", color: "#3F170E" }}>Is this a public event?</p>
                            <br></br>
                            <div className='ask-user'>
                                <div>
                                    <label>
                                        <div className='option-btn-1'>
                                            <input
                                                type="radio"
                                                value="Yes"
                                                checked={selectedOption === 'Yes'}
                                                onChange={handleOptionChange}
                                            />
                                            Yes
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <div className='option-btn-2'>
                                            <input
                                                type="radio"
                                                value="No"
                                                checked={selectedOption === 'No'}
                                                onChange={handleOptionChange}
                                            />
                                            No
                                        </div>
                                    </label>
                                </div>
                                {/* {error && selectedOption === '' ?
                                <label style={{ color: 'red' }}>Choose any one</label> : ""} */}

                            </div>
                            {selectedOption === "No" ?
                                <>
                                    <p style={{ marginLeft: "70px", marginTop: "30px", fontWeight: "700", color: "#3F170E" }}>Select maximum Seats:</p>
                                    <br></br>
                                    <br></br>
                                    <select onChange={handleSeatChange} style={{ width: "500px" }}>
                                        {
                                            [...Array(1000)].map((_, i) => i + 1)
                                                .map(i => <option key={i} value={i}>{i}</option>)
                                        }

                                    </select>
                                </>
                                : ""}

                       

                            {/* here */}

                        </div>

                    </div>
                    <br></br>

                    <div className='rows-3'>
                        <p style={{ marginLeft: "-50px", marginTop: "70px", fontWeight: "700", color: "#3F170E" }}>Social media links:</p>
                        <div className='socialmedia' style={{ color: "black", display: "flex", flexDirection: "row", gap: "30px", marginLeft: "-50px" }}>
                            <div>
                                <label style={{ color: "blue", height: "30px", width: "30px" }}>
                                    <BsFacebook /> Facebook:
                                </label>
                                <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                            </div>
                            <div>
                                <label style={{ color: "#2a9df4" }}>
                                    <BsTwitter /> Twitter:
                                </label>
                                <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                            </div>
                            <div>
                                <label style={{ color: "red" }}>
                                    <BsInstagram /> Instagram:
                                </label>
                                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                            </div>
                            <div>
                                <label style={{ color: "blue" }}>
                                    <BsLinkedin /> LinkedIn:
                                </label>
                                <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                            </div>
                        </div>
                        <br>
                        </br><br></br>
                        <button className='btn' style={{ marginLeft: "-400px" }}> Submit</button> </div>



                    <br></br>
                </form>
                <br></br>
            </div>
        </div>
    )
}


