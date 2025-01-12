// import React, { useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     gender: '',
//     skills: '',
//     about: '',
//   });
//   const dispatch =useDispatch();
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${BASE_URL}/profile/edit`, formData, {
//         withCredentials: true,
//       });
//       setMessage('Profile updated successfully!');
//       console.log(response.data);
//       dispatch(addUser(response.data.data));
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//       setMessage('Failed to update profile.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-5 bg-slate-900">
//       <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="input input-bordered flex items-center gap-2">
//           First Name
//           <input
//             type="text"
//             name="firstName"
//             className="grow"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
            
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Last Name
//           <input
//             type="text"
//             name="lastName"
//             className="grow"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
            
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Age
//           <input
//             type="number"
//             name="age"
//             className="grow"
//             placeholder="Age"
//             value={formData.age}
//             onChange={handleChange}
            
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Gender
//           <select
//             name="gender"
//             className="grow"
//             value={formData.gender}
//             onChange={handleChange}
            
//           >
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Skills (comma-separated)
//           <input
//             type="text"
//             name="skills"
//             className="grow"
//             placeholder="e.g., JavaScript, React, Node.js"
//             value={formData.skills}
//             onChange={handleChange}
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           About
//           <textarea
//             name="about"
//             className="grow"
//             placeholder="Tell us about yourself"
//             value={formData.about}
//             onChange={handleChange}
            
//           />
//         </label>

//         <button type="submit" className="btn btn-primary w-full">
//           Update Profile
//         </button>

//         {message && <p className="text-center text-green-500">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BASE_URL } from '../utils/constants';
// import { useDispatch, useSelector } from 'react-redux';
// import { addUser } from '../utils/userSlice';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user); // Get user from Redux store

//   // Individual state for each field
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [skills, setSkills] = useState('');
//   const [about, setAbout] = useState('');
//   const [message, setMessage] = useState('');

//   // Prefill the form fields with the current user data
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName || '');
//       setLastName(user.lastName || '');
//       setAge(user.age || '');
//       setGender(user.gender || '');
//       setSkills(user.skills || '');
//       setAbout(user.about || '');
//     }
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       firstName,
//       lastName,
//       age,
//       gender,
//       skills,
//       about,
//     };
//     try {
//       const response = await axios.post(`${BASE_URL}/profile/edit`, formData, {
//         withCredentials: true,
//       });
//       setMessage('Profile updated successfully!');
//       dispatch(addUser(response.data.data)); // Update Redux store with new user data
//     } catch (error) {
//       console.error('Error updating profile:', error.response ? error.response.data : error.message);
//       setMessage('Failed to update profile.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-5 bg-slate-900">
//       <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="input input-bordered flex items-center gap-2">
//           First Name
//           <input
//             type="text"
//             className="grow"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Last Name
//           <input
//             type="text"
//             className="grow"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Age
//           <input
//             type="number"
//             className="grow"
//             placeholder="Age"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Gender
//           <select
//             className="grow"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//           >
//             <option value="" disabled>Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           Skills (comma-separated)
//           <input
//             type="text"
//             className="grow"
//             placeholder="e.g., JavaScript, React, Node.js"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           About
//           <textarea
//             className="grow"
//             placeholder="Tell us about yourself"
//             value={about}
//             onChange={(e) => setAbout(e.target.value)}
//           />
//         </label>

//         <button type="submit" className="btn btn-primary w-full">
//           Update Profile
//         </button>

//         {message && <p className="text-center text-green-500">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCards from './UserCards'; // Import the UserCards component

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); // Get user from Redux store

  // Individual state for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('other');
  const [skills, setSkills] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [about, setAbout] = useState('');
  const [message, setMessage] = useState('');

  // Prefill the form fields with the current user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setAge(user.age || '');
      setGender(user.gender || '');
      setPhotoUrl(user.photoUrl || '');
      setSkills(user.skills || '');
      setAbout(user.about || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      age,
      gender,
      skills,
      about,
      photoUrl,
    };
    console.log(formData)
    try {
      const response = await axios.post(`${BASE_URL}/profile/edit`, formData, {
        withCredentials: true,
      });
      setMessage('Profile updated successfully!');
      dispatch(addUser(response.data.data)); // Update Redux store with new user data
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 flex justify-between space-x-10">
      <div className="flex-1 bg-base-300 p-10 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            First Name
            <input
              type="text"
              className="grow"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Last Name
            <input
              type="text"
              className="grow"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Age
            <input
              type="number"
              className="grow"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Gender
            <select
              className="grow"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Skills :
            <input
              type="text"
              className="grow"
              placeholder=""
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            About
            <textarea
              className="grow"
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
          
          <label className="input input-bordered flex items-center gap-2">
            Photo URL
            <input
              type="text"
              className="grow"
              placeholder="Enter image URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Update Profile
          </button>

          {message && <p className="text-center text-green-500">{message}</p>}
        </form>
      </div>

      {/* UserCard Preview */}
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-4 ml-5">    Profile Preview</h3>
        <UserCards user={{ ...user, firstName, lastName, about }} /> {/* Pass the current user and updated values */}
      </div>
    </div>
  );
};

export default Profile;


