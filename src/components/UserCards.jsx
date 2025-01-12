// import axios from 'axios';
// import React from 'react'
// import { BASE_URL } from '../utils/constants';

// const  UserCards= ({user}) => {
//     const makeRequest = (status,_id)=>{
//         try {
//             const res = axios.post(`${BASE_URL}/request/send/${status}/${_id}`,{},{
//                 withCredentials:true
//             })
            
//         } catch (error) {
//             console.log(error);
//         }
//     }
//   return (

// <div className="card bg-base-300 w-96 shadow-xl m-10">
// <figure>
//   <img
//     src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
//     alt={`${user.firstName} ${user.lastName}`}
//     className="w-full h-60 object-cover"
//   />
// </figure>
// <div className="card-body">
//   <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
//   <p>Gender : {user.gender || "No description available."}</p>
//   <p>{user.about || "No description available."}</p>
//   <p>Skills : {user.skills || "No description available."}</p>
//   <div className="card-actions justify-center">
//     <button className="btn btn-primary">Interested</button>
//     <button className="btn btn-secondary">Ignored</button>
//   </div>
// </div>
// </div>
//   )
// }

// export default UserCards;




import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const UserCards = ({ user }) => {
  const [isVisible, setIsVisible] = useState(true);

  const makeRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      console.log(`Request sent: ${status}`);
      setIsVisible(false);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-10">
      <figure>
        <img
          src={user.photoUrl || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
        <p>Gender: {user.gender || 'No description available.'}</p>
        <p>{user.about || 'No description available.'}</p>
        <p>Skills: {user.skills || 'No description available.'}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => makeRequest('interested', user._id)}
          >
            Interested
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => makeRequest('ignored', user._id)}
          >
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCards;

