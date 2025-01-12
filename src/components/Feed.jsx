import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

import UserCards from './UserCards'
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate()
      // Fetch feed data when the component mounts
        useEffect(() => {
            const fetchFeed = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/feed`, {
                withCredentials: true, 
                });
                setPosts(response.data);
                console.log(response.data)
                // Assuming the backend returns { posts: [...] }
                setLoading(false);
            } catch (err) {
                setError('Failed to load feed.');
                // console.error('Error fetching feed:', err.response ? err.response.data : err.message);
                setLoading(false);
                
                navigate('/login')
            }
            };

            fetchFeed();
    }, []);
  return (
    <div className='flex m-10 flex-wrap justify-around '>
        {        
        posts.map((user) => (
          <UserCards key={user._id} user={user} />
        ))
        }
  </div>
  )
}

export default Feed