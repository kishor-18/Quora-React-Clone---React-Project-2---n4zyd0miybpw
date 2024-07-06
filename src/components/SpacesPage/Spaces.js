import React, { useEffect, useState } from 'react';
import './Spaces.css';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [followedSpaces, setFollowedSpaces] = useState(new Set());

  useEffect(() => {
    const fetchSpaces = async () => {
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw'; // Replace with your actual JWT token
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

  const handleFollow = async (spaceId) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw'; // Replace with your actual JWT token
    const projectID = 'vmyitayk3fnu'; // Replace with your actual project ID

    const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/channel/follow/${spaceId}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'projectID': projectID
      }
    });

    if (response.ok) {
      setFollowedSpaces((prev) => new Set(prev).add(spaceId));
    } else {
      console.error('Failed to follow space');
    }
  };

  const handleUnfollow = async (spaceId) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODJmMDllOTVlMzg5ZmIxMjM1ZGMyZCIsImlhdCI6MTcxOTk5MTA1MCwiZXhwIjoxNzUxNTI3MDUwfQ.uJcBDToCRYd34LZ2ouRD_p539HNXbdyCnxakRhL6POw'; // Replace with your actual JWT token
    const projectID = 'vmyitayk3fnu'; // Replace with your actual project ID

    const response = await fetch(`https://academics.newtonschool.co/api/v1/quora/channel/unfollow/${spaceId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'projectID': projectID
      }
    });

    if (response.ok) {
      setFollowedSpaces((prev) => {
        const newSet = new Set(prev);
        newSet.delete(spaceId);
        return newSet;
      });
    } else {
      console.error('Failed to unfollow space');
    }
  };

  return (
    <div className="spaces">
      {spaces.map(space => (
        <div key={space.id} className="space">
          <h3>{space.title}</h3>
          <p>{space.description}</p>
          {followedSpaces.has(space.id) ? (
            <button onClick={() => handleUnfollow(space.id)}>Unfollow</button>
          ) : (
            <button onClick={() => handleFollow(space.id)}>Follow</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Spaces;
