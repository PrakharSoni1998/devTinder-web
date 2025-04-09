import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionsSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store=>store.connections)
  const handleGetConnectionList = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    handleGetConnectionList();
  }, [])
  
  if(!connections || connections.length ==0) return <div className="flex justify-center my-5">No connection found.</div>
  return <div>
      <h1 className="text-center mt-3 text-2xl">Connections</h1>
    {connections && connections.map(connection => <ConnectionCard user = {connection} /> )}</div>;
};

export default Connections;
