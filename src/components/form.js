import React from 'react';
import bgImg from '../assets/logo-png.png';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Select from "react-select";
import Login from './login';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Form(props) {

    let navigate = useNavigate();
    const { register, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [Emailid, setEmailid] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Type, setType] = useState('')
    const [error, setError] = useState(false)
    const [selection, setSelection] = useState('')
    const [psswordError, setPasswordError] = useState(false)

    // React user state
    const [postData, setPostData] = useState({}); 

    // Setting user options
    const options = [
        { value: "user", label: "User" },
        { value: "contributer", label: "Contributer" },

    ];

    //validation
    const [lengthValidated, setLengthValidated] = useState(false);


    //select validation
    const [
        isValid,
        setIsValid
    ] = useState(false);

    const handleSubmit  = async(e) => {
        if (Emailid.length == 0 || Password.length <= 7 || ConfirmPassword != Password) {
            setError(true)
            // alert(selection);
        } else {
            // if (selection === "contributer") {
            //     navigate('/cprofile')
            // } 
            // else if (selection === "user") {
            //     navigate('/uprofile')
            // }
            navigate('/login');
        }
        console.log(Emailid, 'Emailid')

        console.log(Password, 'password')
        const data = {
            "User_emailid": Emailid,
            "Password": Password,
            "User_type": selection
          };
        
          const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          };
        
          try {
            console.log(process.env.REACT_APP_API_URL, "uyuy");
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Event/insertuser`, data, { headers });
            
            // Handle the response data here
            console.log('Response:', response.data);
        
          } catch (error) {
            // Handle error responses here
            console.error('Error:', error);
          }
        // const data = {
        //     "User_emailid":Emailid, 
        //         "Password":Password,
        //         "User_type":selection
        // };

        // const settings = {
        //     method: 'POST',
          
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // }


        // try {
        //     console.log(process.env.REACT_APP_API_URL,"uyuy")
        //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/Event/insertuser`,settings);
            

        //   } catch (error) {
        //     // Handle error responses here
        //     console.error('Error:', error);
        //   }
     
            e.preventDefault();
            e.persist();

       

        if (Emailid && Password && ConfirmPassword) {
            var encription = btoa(Password)
            var decription = atob(encription)
            console.log("Email: ", Emailid, "\nPassword: ", btoa(Password), "Confirm: ", ConfirmPassword, "Selection: ", selection);
        }
        // console.log(decription,'decription')

        // if(options.value==="contributer"){navigate('/cprofile')}
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // On change effect
    useEffect(() => {
        setIsValid(selection ? true : false);
    }, [selection]);

    // An action when the form is submitted.
    // const FormSubmit = (e) => { 

    // };

    const userOnchange = (e) => {

        if (e.target.name === "Emailid") {

            setEmailid(e.target.value)
            console.log(Emailid, 'Emailid')

        }
        if (e.target.name === "Password") {
            setPassword(e.target.value)
            console.log(Password, 'Password')
        }
        if (e.target.name === "ConfirmPassword") {
            setConfirmPassword(e.target.value)
            console.log(ConfirmPassword, 'ConfirmPassword')
        }
    }


    return (
      
        <div>
             {/* <div style={{display:"none"}}><Login selection={selection} setSelection={setSelection} /></div>  */}
            <div className='register'>
                <section>
                    <div className='signup'>
                        <div className='col-2'>
                            <img src={bgImg} />
                        </div>
                        <div className='col-1'>
                            <div className='heading'>
                                <h1>Sign up</h1>
                            </div>

                            <form id='form' className='flex flex-col' onSubmit={handleSubmit} >
                                <input type='text' name='Emailid'   placeholder='Emailid' onChange={userOnchange} />
                                {error && Emailid.length <= 0 ?
                                    <label>Email-id can't be Empty</label> : ""}

                                <input type='password' name='Password' placeholder='Password' onChange={userOnchange} />
                                {error && Password.length <= 7 ?
                                    <label>Password should be of minimum 8 characters</label> : ""}


                                <input type='password' name='ConfirmPassword'  placeholder='Confirm Password' onChange={userOnchange} />
                                {error && Password != ConfirmPassword ?
                                    <label>Password is not matched</label> : ""}
                                <br></br>
                                {/* confirm password length:  {ConfirmPassword.length } */}
                                {/* <main className='tracker-box'>
                                <div className={lengthValidated ? 'validated' : 'not-validated'}>
                                    {lengthValidated ? (
                                        <span className='list-icon green'>
                                            <Icon icon={checkCircleO} />
                                        </span>
                                    ) : (
                                        <span className='list-icon'>
                                            <Icon icon={ban} />
                                        </span>
                                    )}
                                    At least 8 characters
                                </div>
                            </main> */}

                                {/* <input type='text' {...register("User Type")} placeholder='User/Contributer' onChange={(e) => setType(e.target.value)} /> */}

                                <Select className='selection'
                                    options={options}
                                    onChange={(e) => setSelection(e.value)}
                                    value={options.filter(function (option) {
                                        // console.log(option, )
                                        return option.value === selection;
                                    })}
                                    label="Select option"
                                    placeholder={"User Type..."}
                                    menuPlacement="bottom"
                                // required
                                />
                                {!isValid && <p style={{ color: 'red', marginLeft: "120px" }}>Please select an option... </p>}
                                <br></br>
                                <button className='btn'> Sign Up</button>
                            </form>
                            <p style={{ marginLeft: "150px", marginTop: "50px" }}>
                                Already a user?<Link className="this-link" to='/login'>Log in</Link>
                            </p>

                        </div>

                    </div>

                </section>
            </div>
        </div>
    )
}
