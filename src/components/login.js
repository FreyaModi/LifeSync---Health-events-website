import React, { useCallback } from 'react';
import bgImg from '../assets/logo-png.png';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import Icon from 'react-icons-kit';
import { ban } from 'react-icons-kit/fa/ban'
import { checkCircleO } from 'react-icons-kit/fa/checkCircleO'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';

export default function Login({ selection, setSelection }) {

    let navigate = useNavigate();
    const [type, setType] = useState("password");
    const [error, setError] = useState(false)
    const [Emailid, setEmailid] = useState('')
    const [Password, setPassword] = useState('')
    const [validate, setvalidate] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();
        e.persist();
        console.log("Email: ", Emailid, "\nPassword: ", Password);

        if (Emailid.length == 0 || Password.length <= 0) {
            setError(true)
            // alert(selection);
        }
        // if (Emailid && Password) {
        //     console.log("Email: ", Emailid, "\nPassword: ");
        //     if (selection === "contributer") {
        //         navigate('/cprofile')
        //     }
        //     else if (selection === "user") {
        //         navigate('/uprofile')
        //     }
        // }

        const data = {
            "User_emailid": Emailid,
            "Password": Password,

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/validate`, settings);
            // const userid = await response.json(); 
            // sessionStorage.setItem("userid", userid);
            // console.log(response.data)
            if (response.ok) {
                // Validation successful, you can use the userId from the response
                const userid = await response.json();
                sessionStorage.setItem("userid", userid);
                // Perform the necessary actions after successful validation (e.g., navigate to the home page)
                navigate('/uprofile'); // Replace '/home' with the actual path of your home page
            } else {
                // Handle the error response
                const errorData = await response.json();
                setError(errorData.validate);
                console.log("error");
                // <Popup  >
                //     <div>User doesn't exists!!</div>
                // </Popup>
                alert("User doesn't exists!!");
            }
        }


        catch (error) {
            // Handle error responses here
            console.error('Error:', error);
            // setvalidate(error.response.data.validate);
        }

    }
    const handleInputChange = (event) => {

        //     console.log("Email: ", Emailid, "\nPassword: ");
        //     if (selection === "contributer") {
        //         navigate('/cprofile')
        //     }
        //     else if (selection === "user") {
        //         navigate('/uprofile')

        // }

        // navigate('/cprofile')
    }
    return (
        <div className='register'>
            <section >
                <div className='signup'>
                    <div className='col-2'>
                        <img src={bgImg} />
                    </div>
                    <div className='col-1'>
                        <div className='heading'>
                            <h1>Log in</h1>
                        </div>

                        <form id='form' className='flex flex-col' onSubmit={handleSubmit} >
                            <input type='text' placeholder='Email-id' onChange={e => setEmailid(e.target.value)} />
                            {error && Emailid.length <= 0 ?
                                <label>Email-id can't be Empty</label> : ""}


                            <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                            {error && Password.length <= 8 ?
                                <label>Password cannot be empty</label> : ""}
                            <br></br>
                            <br></br>
                            <button className='btn' onClick={handleInputChange}>Log in</button>

                            <p style={{ marginLeft: "150px", marginTop: "50px" }}>
                                New user?<Link className="this-link" to='/form' >Sign up</Link>
                            </p>
                        </form>
                    </div>

                </div>

            </section>
        </div>
    )
}
