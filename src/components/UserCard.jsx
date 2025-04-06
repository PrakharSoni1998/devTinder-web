import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import ToastMessage from "./ToastMessage";

const UserCard = ({ user }) => {
  const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
  const { _id, firstName, lastName, photoURL, about, age, gender, skills } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    setError(false)
    setErrorMsg('')
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("err",error);
      setError(true)
      setErrorMsg(error.response.data.message)
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="User Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-3">
          <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
        </div>
      </div>
      {error && <ToastMessage message={errorMsg}/>}
    </div>
  );
};

export default UserCard;
