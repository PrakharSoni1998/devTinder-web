import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/connectionRequestSlice";
import ConnectionCard from "./ConnectionCard";
import ConnectionRequestCard from "./ConnectionRequestCard";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchConnectionRequest = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received",{withCredentials:true});
    dispatch(addRequest(res.data.data));
  };
  useEffect(() => {
    fetchConnectionRequest();
  }, []);

  if(!requests || requests.length ==0) return <div className="flex justify-center my-5">No connection request found.</div>
  return <div>
      <h1 className="text-center mt-3 text-2xl">Connection Requests</h1>
    {requests && requests.map(request => <ConnectionRequestCard user = {request.fromUserId} _id={request._id} /> )}</div>;
};

export default ConnectionRequests;
