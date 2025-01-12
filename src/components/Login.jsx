


// import axios from 'axios';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';
// import { BASE_URL } from '../utils/constants';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [isLoginPage, setIsLoginPage] = useState(true);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleAuth = async () => {
//     const endpoint = isLoginPage ? '/login' : '/signup';
//     const payload = isLoginPage
//       ? { emailId: email, password: password }
//       : { firstName, lastName, emailId: email, password: password };

//     try {
//       const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
//         withCredentials: true,
//       });
//       console.log(res.data);
//       dispatch(addUser(res.data));
//       navigate('/profile');
//     } catch (error) {
//       console.error('Authentication error:', error);
//     }
//   };

//   return (
//     <div className='flex h-screen items-center justify-center'>
//       <div className="card bg-base-200 w-96 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center">
//             {isLoginPage ? 'Login' : 'Sign Up'}
//           </h2>
//           {!isLoginPage && (
//             <>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 className="input input-bordered w-full max-w-xs mt-2"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 className="input input-bordered w-full max-w-xs mt-2"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </>
//           )}
//           <input
//             type="text"
//             placeholder="Email ID"
//             className="input input-bordered w-full max-w-xs mt-2"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="input input-bordered w-full max-w-xs mt-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="card-actions justify-center mt-3">
//             <button className="btn btn-primary" onClick={handleAuth}>
//               {isLoginPage ? 'Login' : 'Sign Up'}
//             </button>
//           </div>
//           <p className="text-center mt-2">
//             {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
//             <button
//               className="btn btn-link"
//               onClick={() => setIsLoginPage(!isLoginPage)}
//             >
//               {isLoginPage ? 'Sign Up' : 'Login'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuth = async () => {
    const endpoint = isLoginPage ? '/login' : '/signup';
    const payload = isLoginPage
      ? { emailId: email, password: password }
      : { firstName, lastName, emailId: email, password: password };

    try {
      const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addUser(res.data));
      if(isLoginPage){
        navigate('/');
      }else{
        navigate('/profile');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.response?.data || 'Authentication failed.');
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className="card bg-base-200 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginPage ? 'Login' : 'Sign Up'}
          </h2>
          {!isLoginPage && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full max-w-xs mt-2"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full max-w-xs mt-2"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Email ID"
            className="input input-bordered w-full max-w-xs mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleAuth}>
              {isLoginPage ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <p className="text-center mt-2">
            {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
            <button
              className="btn btn-link"
              onClick={() => {
                setIsLoginPage(!isLoginPage);
                setError('');
              }}
            >
              {isLoginPage ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
