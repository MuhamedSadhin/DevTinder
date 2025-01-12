// import React from 'react'

// const Connections = () => {
//   return (
//     <div className='flex justify-center'>
//         <div className="overflow-x-auto w-[1200px] ">
//         <table className="table">
//             {/* head */}
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Job</th>
//                 <th>Favorite Color</th>
//                 <th></th>
//             </tr>
//             </thead>
//             <tbody>
//             {/* row 1 */}
//             <tr>

//                 <td>
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                         <img
//                         src="https://img.daisyui.com/images/profile/demo/2@94.webp"
//                         alt="Avatar Tailwind CSS Component" />
//                     </div>
//                     </div>
//                     <div>
//                     <div className="font-bold">Hart Hagerty</div>
//                     <div className="text-sm opacity-50">United States</div>
//                     </div>
//                 </div>
//                 </td>
//                 <td>
//                 Zemlak, Daniel and Leannon
//                 <br />
//                 <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
//                 </td>
//                 <td>Purple</td>
//                 <th>
//                 <button className="btn btn-ghost btn-xs">details</button>
//                 </th>
//             </tr>
//             {/* row 2 */}
//             <tr>

//                 <td>
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                         <img
//                         src="https://img.daisyui.com/images/profile/demo/3@94.webp"
//                         alt="Avatar Tailwind CSS Component" />
//                     </div>
//                     </div>
//                     <div>
//                     <div className="font-bold">Brice Swyre</div>
//                     <div className="text-sm opacity-50">China</div>
//                     </div>
//                 </div>
//                 </td>
//                 <td>
//                 Carroll Group
//                 <br />
//                 <span className="badge badge-ghost badge-sm">Tax Accountant</span>
//                 </td>
//                 <td>Red</td>
//                 <th>
//                 <button className="btn btn-ghost btn-xs">details</button>
//                 </th>
//             </tr>
//             {/* row 3 */}
//             <tr>

//                 <td>
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                         <img
//                         src="https://img.daisyui.com/images/profile/demo/4@94.webp"
//                         alt="Avatar Tailwind CSS Component" />
//                     </div>
//                     </div>
//                     <div>
//                     <div className="font-bold">Marjy Ferencz</div>
//                     <div className="text-sm opacity-50">Russia</div>
//                     </div>
//                 </div>
//                 </td>
//                 <td>
//                 Rowe-Schoen
//                 <br />
//                 <span className="badge badge-ghost badge-sm">Office Assistant I</span>
//                 </td>
//                 <td>Crimson</td>
//                 <th>
//                 <button className="btn btn-ghost btn-xs">details</button>
//                 </th>
//             </tr>
//             {/* row 4 */}
//             <tr>

//                 <td>
//                 <div className="flex items-center gap-3">
//                     <div className="avatar">
//                     <div className="mask mask-squircle h-12 w-12">
//                         <img
//                         src="https://img.daisyui.com/images/profile/demo/5@94.webp"
//                         alt="Avatar Tailwind CSS Component" />
//                     </div>
//                     </div>
//                     <div>
//                     <div className="font-bold">Yancy Tear</div>
//                     <div className="text-sm opacity-50">Brazil</div>
//                     </div>
//                 </div>
//                 </td>
//                 <td>
//                 Wyman-Ledner
//                 <br />
//                 <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
//                 </td>
//                 <td>Indigo</td>
//                 <th>
//                 <button className="btn btn-ghost btn-xs">details</button>
//                 </th>
//             </tr>
//             </tbody>
//         </table>
//         </div>
//     </div>
//   )
// }

// export default Connections



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants'; // Replace with your actual base URL

const Connections = () => {
  const [connections, setConnections] = useState([]); // Make sure this is initialized as an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true, // If you need to send cookies for authentication
        });

        // Check if the response data is an array
        if (Array.isArray(response.data.data)) {
          setConnections(response.data.data); // Update state with the fetched data
        } else {
        // setError('No Connections founded'); // Error if not an array
            setConnections(null);
        }
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load connections');
        setLoading(false);
      }
    };

    fetchConnections();
  }, []); // Empty dependency array ensures the fetch runs once on mount

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
            <caption className='font-bold'>Connections</caption>
          {/* Table Head */}

          <tbody>
            {/* Render connections dynamically */}
            {connections && connections.length > 0 ? (
              connections.map((connection) => (
                <tr key={connection._id}>
                  <td>
                    <div className="flex items-center gap-3 m-5">
                      <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16">
                          <img
                            src={connection.photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                            alt={`${connection.firstName} ${connection.lastName}`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold"><span>{`${connection.firstName} ${connection.lastName}`}</span></div>
                        <div className="text-sm opacity-50">{connection.gender || 'Unknown'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {connection.about}
                    <br />
                  </td>  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No connections found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Connections;
