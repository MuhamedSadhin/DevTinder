// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants'; // Replace with your actual base URL

// const Requests = () => {
//   const [requests, setRequests] = useState([]); // Store received requests
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track error state

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/user/request/received`, {
//           withCredentials: true, // If you need to send cookies for authentication
//         });

//         // // Check if the response data is an array
//         // if (Array.isArray(response.data.data)) {
//         //   setRequests(response.data); // Update state with the fetched data
//         // } else {
//         //   setError('Invalid data format'); // Error if not an array
//         // }
//         setRequests(response.data);
//         console.log(response.data)
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load requests');
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []); // Empty dependency array ensures the fetch runs once on mount

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while fetching
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if the fetch fails
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="overflow-x-auto w-[1200px]">
//         <table className="table">
//           {/* Table Head */}
//           {/* <thead>
//             <tr>
//               <th>Name</th>
//               <th>Job</th>
//               <th>Request Status</th>
//               <th></th>
//             </tr>
//           </thead> */}
//           <tbody>
//             {/* Render requests dynamically */}
//             {requests && requests.length > 0 ? (
//               requests.map((request) => (
//                 <tr key={request._id}>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="mask mask-squircle h-12 w-12">
//                           <img
//                             src={request.fromUserId.photoUrl|| "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
//                             alt={`${request.fromUserId.firstName} ${request.lastName}`}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold">{`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}</div>
//                         <div className="text-sm opacity-50">{request.fromUserId.gender || 'Unknown'}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     {request.fromUserId.about}
//                     <br />
//                   </td>
//                   {/* <td>{request.status || 'Pending'}</td> */}
//                   <th>
//                       <div className='flex justify-center'>
//                       <button className="btn btn-primary m-3">Accept</button>
//                       <button className="btn btn-warning m-3">reject</button>
//                       </div>
//                   </th>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4">No requests found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Requests;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants'; // Replace with your actual base URL

const Requests = () => {
  const [requests, setRequests] = useState([]); // Store received requests
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/request/received`, {
          withCredentials: true, // If you need to send cookies for authentication
        });
        setRequests(response.data);
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setRequests(response.data); // Update state with the fetched data
        } else {
          setRequests(null); // Error if not an array
          // setRequests(null);
        }
        console.log(requests);
        setLoading(false);
      } catch (error) {
        setError('Failed to load requests');
        setLoading(false);
      }
    };
    console.log(requests);
    fetchRequests();
  }, []); // Empty dependency array ensures the fetch runs once on mount

  // Handle accept/reject requests
  const handleRequestAction = async (status, requestId) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, null, {
        withCredentials: true, // If needed for authentication
      });
      
      // After the action, refetch the requests to update the UI
      setRequests(prevRequests => prevRequests.filter(request => request._id !== requestId));
    } catch (error) {
      setError('Failed to update request status');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if the fetch fails
  }

  return (
    <div className="flex justify-center">
      <div className="overflow-x-auto w-[900px]">
        <table className="table">
        <caption className='font-bold'>Requests received</caption>
          <tbody>
            {/* Render requests dynamically */}
            {requests && requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={request.fromUserId.photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                            alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}</div>
                        <div className="text-sm opacity-50">{request.fromUserId.gender || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {request.fromUserId.about}
                  </td>
                  <th>
                    <div className='flex justify-center'>
                      <button
                        className="btn btn-primary m-3"
                        onClick={() => handleRequestAction('accepted', request._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-warning m-3"
                        onClick={() => handleRequestAction('rejected', request._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;


