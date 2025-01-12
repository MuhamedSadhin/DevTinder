import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const user = useSelector((store)=>store.user);
  const dispatch =useDispatch();
  const navigate = useNavigate()

      const fetchUser = async ()=>{
        if(user){
          return 
        }
        try {

          const res = await axios.get(`${BASE_URL}/profile/view`,{
            withCredentials:true
          })
          console.log(res.data)
          dispatch(addUser(res.data));
        } catch (error) {
          console.log(error.response.data);
          navigate('/login')
        }
      }
      useEffect(()=>{
          fetchUser();
      },[])

  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
