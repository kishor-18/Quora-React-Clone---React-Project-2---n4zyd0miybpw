import React, { useEffect, useState } from 'react';
import './Spaces.css';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw'; // Replace with your actual JWT token
      const projectID = 'vmyitayk3fnu'; // Replace with your actual project ID

      const response = await fetch('https://academics.newtonschool.co/api/v1/quora/channel/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'projectID': projectID
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSpaces(data);
      } else {
        console.error('Failed to fetch spaces');
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className="spaces">
      {spaces.map(space => (
        <div key={space.id} className="space">
          <h3>{space.title}</h3>
          <p>{space.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Spaces;
