import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const user = useSelector(store=>store.user)
  const navigate = useNavigate()

  const fetchProfile = async()=>{
    try {
      const res = await axios.get(BASE_URL+'/profile/view',{withCredentials:true})
      dispatch(addUser(res.data.data))
    } catch (error) {
      console.log("err",error);
      if(error.status ==401){
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    if(!user){
    fetchProfile()
    }
  }, [])
  
  return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body