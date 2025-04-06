import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigation("/");
    } catch (error) {
      console.log("err", error);
      setError(error.response.data || "Something went wrong!");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigation("/profile");
    } catch (error) {
      console.log("err", error);
      setError(error.response.data || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID :</legend>
            <input
              type="text"
              className="input"
              placeholder="Email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password :</legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignup}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="flex justify-center mt-3 cursor-pointer" onClick={()=>setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? Sign Up" : "Already have an account? Login"}</div>

        </div>
      </div>
    </div>
  );
};

export default Login;
