import React,{useState,useRef} from 'react'
import profileImg from '../assets/profile.png';
import './profile.css';

export default function Profilepic() {
    const inputRef=useRef(null);
    const[image,setImage]=useState("");

    const handleImageClick=()=>{
        inputRef.current.click();
    }
    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
    }
  return (

    <>
    <div className='image-upload-container'>
    
    <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
      {/* <img src={profileImg} alt=""/> */}
      {
        image?(
            <img src={URL.createObjectURL(image)} alt='' className="img-display-after"/>
        ):(
            <img src={profileImg} alt='' className="img-display-before"/>
        )
      }
      <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
    </div>
    </div>
    </>
  )
}
