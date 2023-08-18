import React from 'react'
import Navbar from './navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { Link,Redirect} from "react-router-dom";
import './profile.css';

export default function Aboutus() {
    return (
        <>
            <div>
                <Navbar />
                <div className='whole'>
                </div>
                <div className='aboutus'>
                    <div className='col'>
                        <h2>Why Yoga?</h2>
                        <br></br>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className='col'>
                        <h2>Who are we?</h2>
                        <br></br>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    </div>
                    <div className='col'>
                        <h2>Why to donate?</h2>
                        <br></br>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    </div>
                </div>
                <div className='social-container'>
                    <h3>Follow us on:</h3>
                  
                    <Link to="https://www.facebook.com/learnbuildteach/"
                        className="youtube social">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="https://www.facebook.com/learnbuildteach/"
                        className="youtube social">
                        <FontAwesomeIcon icon={faInstagram} size="2x" color='red'/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link to="https://www.facebook.com/learnbuildteach/"
                        className="youtube social">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" color='BLUE'/>
                    </Link>
                </div>
            </div>
        </>
    )
}
