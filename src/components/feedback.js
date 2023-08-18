import React from 'react'
import Event from './events.json';
import './feedback.css'
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Feedback() {
    let navigate = useNavigate();
    // const eveData = JSON.parse(JSON.stringify(Event)).eventList

    // State to hold the current rating, initialized to 0

    // Function to handle the click event when a star is clicked
    const handlefeedsumbit = (j)=>{
        console.log(itemsInfeedback,"itemsInfeedback")
        console.log(j,"itemsInfeedback")
    }

    const handleRatingClick = (newRating, index) => {
        console.log("hgufuyf")
        const data = feedbackEve.map((e, index1) => {
            if (index1 === index) {
                return ({
                    ...e,
                    review: newRating,

                })
            } else {
                return e
            }
        })
        setfeedbackEve(data)
    };
    //console.log(feedbackEve)
    /////////////////////////////    FEEDBACK GET     ////////////////////////////////////
    const [feedbackEve, setfeedbackEve] = useState([])

    const GetfeedbackEve = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/Event/feedbackevent?id=` + sessionStorage.getItem("userid"))
            .then(response => {
                return response.json()
            })
            .then(data => {
                const tempData = data.map((e) => {
                    return ({
                        ...e,
                        review: 0
                    })
                })
                setfeedbackEve(tempData)
            })
    }

    useEffect(() => {
        GetfeedbackEve()
    }, [])
    //////////////////////////////////////////////////////////////
    const itemsInfeedback = [];
    for (let i = 0; i < feedbackEve.length; i += 3) {
        itemsInfeedback.push(feedbackEve.slice(i, i + 3));
    }
    ////////////////////////    FEEDBACK POST   ////////////////////
    const handleFeedback =async (newRating, index) => {
        const data = feedbackEve.map((e,index1)=>{
            console.log("ffff")
            if(index1 === index){
                return({
                    ...e,
                    review: newRating,
                  
                })
            }else{
                return e
            }
        })
        setfeedbackEve(data)

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


        } catch (error) {
            // Handle error responses here
            console.error('Error:', error);
        }

    }
    const handleclicks=()=>{
        navigate('/registered')
      }
    /////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Navbar />
            <div>
                <div className='fieldselects'>
                    <br></br>
                    <button className='btn-211' onClick={handleclicks}> Registered Events </button>
                    <button className='btn-121' > Attended Events</button>
                </div>
            </div>
            <div className='grids'>
                {itemsInfeedback.map((rowItems, rowIndex) => (
                    <div key={rowIndex} className='rowindexes'>
                        {rowItems.map((item, j) => (
                            <div className='colindexes'>
                                <div className='cards-1'>
                                    <div className='cards-top-1'>
                                        <h2>{item.event_name}</h2>
                                        {/* setImg={item.cover_pic}; */}
                                        <img src={`data:image/png;base64,${item.cover_pic}`} alt={item.event_name} />
                                        {/* <img src= alt={item.event_name} onError={handleErrorImage} /> */}
                                        <div className='cards-bottom-12'>
                                            <div className='cards-bottom-lefts'>
                                                <h4>{item.event_area}, {item.event_city}</h4>
                                                <p>Deadline: {item.event_deadline}</p>
                                            </div>
                                            <div className='cards-bottom-rights'>
                                                <p>{item.date_from}-{item.date_to}</p>
                                                <p> {item.duration_from}-{item.duration_to}</p>
                                                <br>
                                                </br>
                                            </div>

                                        </div>
                                        <form on onChange={handleFeedback}>
                                            <div className='feedback-input' style={{ margin: "30px", marginTop: "40px", marginRight: "130px" }}>
                                                <div className='ratings' style={{ display: "flex", flexDirection: "row", marginTop: "-5px" }}>
                                                    <p><b>Ratings:</b></p>
                                                    <div className='star' style={{ margin: "8px" }}>
                                                        {console.log(item, "item9087987")}
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <span
                                                                key={index}
                                                                onClick={() => handleRatingClick(index + 1, j)}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: index < parseInt(item.review) ? 'gold' : 'gray',
                                                                }}
                                                            >
                                                                <FaStar style={{ height: "28px", width: "26px", margin: "5px" }} />
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row", marginTop: "5px", gap: "20px" }}>
                                                    <p><b>Reviews:</b></p>    <textarea style={{ fontSize: "larger", width: "400px" }} rows="3" cols="30" type='text'></textarea>
                                                </div>
                                                <div>
                                                    <button style={{ backgroundColor: "#FFE5B2", height: "30px", color: "#74470c", width: "180px", marginTop: "30px", marginLeft: "-0px" }}> Submit Feedback</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
