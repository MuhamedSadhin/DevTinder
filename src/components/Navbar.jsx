import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        // Send POST request to logout endpoint
        await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  
        // Clear user data from Redux store
        dispatch(removeUser());
  
        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
      }
    };
  return (
    <div>
        <div className="navbar bg-base-300">
        <div className="flex-1 mx-5">
          <Link to={'/'} className="btn btn-ghost text-xl"> 💻 DevTinder</Link>
        </div>
        <div className="flex-none gap-2">
          {/* <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div> */}
            {
                (user && 
                <div className='flex'>
                    <p className="mt-3 mr-3">Hi, {user.firstName}</p>
                <div className="dropdown dropdown-end mr-5">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={user.photoUrl} />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                      <li>
                        <Link to={'/profile'} className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/connections'} className="justify-between">
                          Connections
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/requests'} className="justify-between">
                          Request
                          <span className="badge">New</span>
                        </Link>
                      </li>
                      
                      <li onClick={handleLogout}><a>Logout</a></li>
                    </ul>
                  </div>
                  </div>
                  )
            }
        </div>
      </div>
    </div>
  )
}

export default Navbar
