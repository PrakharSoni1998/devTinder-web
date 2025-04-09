import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import ToastMessage from './ToastMessage';

const Feed = () => {
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
const dispatch = useDispatch()
const feedData = useSelector(store=>store.feed)
  const handleFeed = async()=>{
    setError(false)
    setErrorMsg('')
try {
  const res = await axios.get(BASE_URL+'/feed',{withCredentials:true})
  dispatch(addFeed(res.data.data))
} catch (error) {
  console.log("err",error);
  setError(true)
  console.log("error.response.data.message",error.response.data.message);
  
  setErrorMsg(error.response.data.message)
}
  }
  useEffect(() => {
    handleFeed()
  }, [])
  
  if(!feedData || feedData.length ==0) return <div className="flex justify-center my-5">No new user found.</div>
  
  return (
    feedData &&
    <div className='flex justify-center my-10'>
      <UserCard user={feedData[0]} />
      {error && <ToastMessage message={errorMsg}/>}
    </div>
  )
}

export default Feed