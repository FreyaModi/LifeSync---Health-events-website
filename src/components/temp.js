import React, { useState } from 'react';

function EventList({ donEve }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // Add more fields as needed
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event, eventId) => {
    event.preventDefault();

    const postData = {
      event_id: eventId,
      name: formData.name,
      email: formData.email,
      // Add more fields as needed
    };

    // Send POST request to API using fetch
    fetch('your-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful response
        console.log('Data posted successfully:', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      {donEve.map((item) => (
        <div className='card' key={item.event_id}>
          {/* Your event card content */}
          <form onSubmit={(event) => handleSubmit(event, item.event_id)}>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              placeholder='Name'
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email'
            />
            {/* Add more form fields as needed */}
            <button type='submit'>Submit</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default EventList;
