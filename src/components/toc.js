import React,{useState,useEffect} from 'react'
import './toc.css'
import img from '../assets/logo-transparent-png.png'
import {ImMail3} from 'react-icons/im'
import { useNavigate } from "react-router-dom";

export default function Toc() {


  let navigate = useNavigate();

  const [tickets, setTicket] = useState([])

  const GetfeedbackEve = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/Event/Ticket?user_id=${sessionStorage.getItem("userid")}&event_id=${sessionStorage.getItem("event_id11")}`)

      .then(response => {
        return response.json()
      })
      .then(data => {
        setTicket(data)
      })
  }

  useEffect(() => {
    GetfeedbackEve()
  }, [])
  return (
    <>
    <div>
        <h1 className='heading' style={{marginBottom:"20px",marginTop:"20px",color:"chocolate"}}>Ticket of Confirmation</h1>
        <ImMail3 style={{height:"50px",width:"80px"}}/>
      <div className='ticket'>
        <div>
      {tickets.map((item) => (
            <div className='column-1'>
                <p><b>Participant Name: </b>{item.user_name}</p>
                <p><b>Participant Age: </b>{item.age}</p>
                <p><b>Event Name: </b>{item.event_name}</p>
                <p><b>Organization Name: </b>{item.event_org}</p>
                <p><b>City: </b>{item.event_city}</p>
                <p><b>Area: </b>{item.event_area}</p>
                <p><b>Event dates: </b>{item.date_from} - {item.date_to}</p>
                <p><b>Event timings: </b>{item.duration_from} - {item.duration_to}</p>
            </div>
      ))}
      </div>
            <div className='column-2'>
            <img style={{height:"300px",width:"300px"}} src={img}/>
            </div>
      </div>
    </div>
    </>
  )
}
