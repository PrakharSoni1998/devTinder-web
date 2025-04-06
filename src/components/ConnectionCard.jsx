import React from "react";

const ConnectionCard = ({ user, request }) => {
  const {_id, firstName, lastName, age, gender, about, photoURL } = user;
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
            {request && (
              <div className="flex items-center">
                <button className="btn btn-primary mx-2">Reject</button>
                <button className="btn btn-secondary mx-2">Accept</button>
              </div>
            )}

            {/* <button className="btn btn-square btn-ghost">
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 3L20 12 6 21 6 3z"></path>
            </g>
          </svg>
        </button>
        <button className="btn btn-square btn-ghost">
          <svg
            className="size-[1.2em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </g>
          </svg>
        </button> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionCard;
