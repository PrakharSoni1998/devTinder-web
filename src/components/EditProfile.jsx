import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ToastMessage from "./ToastMessage";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log("err");
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-5">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name </legend>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name </legend>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL </legend>
              <input
                type="text"
                className="input"
                placeholder="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age </legend>
              <input
                type="text"
                className="input"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender </legend>
              {/* <input
                type="text"
                className="input"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              /> */}
              <select defaultValue="Select Gender" className="select" value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option disabled={true}>Pick a gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">About </legend>
              <textarea
                className="textarea"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </fieldset>
            {/* <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name </legend>
          <input
            type="text"
            className="input"
            placeholder="Email ID"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset> */}
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center mt-3">
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-60">
        <p className="flex justify-center text-xl my-3">Card Preview</p>
        <div className="card bg-base-300 w-96 shadow-sm">
          <figure>
            <img src={photoURL} alt="User Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-center my-3">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        </div>
      </div>
      {showToast && <ToastMessage message="Profile saved successfully." success = {true}/>}
    </div>
  );
};

export default EditProfile;
