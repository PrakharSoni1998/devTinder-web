import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/connectionRequestSlice";

const ConnectionRequestCard = ({user , _id}) => {
  const {firstName, lastName, age, gender, about, photoURL } = user;

  const dispatch = useDispatch()
const  handleRequestReview  = async(status)=>{
    try {
        const res = await axios.post(BASE_URL+'/request/review/'+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id))
    } catch (error) {
        console.log("err",error);
    }
}
  return (
    <div key={_id} className="my-3">
      <div className="flex justify-center">
        <ul className="list bg-base-300 rounded-box  w-150">
          <li className="list-row">
            <div>
              <img
                className=" size-20 rounded-box"
                alt="user image"
                src={photoURL}
              />
            </div>
            <div>
              <div>{firstName + " " + lastName}</div>
              {age && gender && <div>{age + ", " + gender}</div>}
              <div className="text-xs uppercase font-semibold opacity-60 mt-2">
                {about.substring(0, 70)}...
              </div>
            </div>
            <div className="flex items-center">
              <button className="btn btn-primary mx-2" onClick={()=>handleRequestReview("rejected")}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={()=>handleRequestReview("accepted")}>Accept</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;
