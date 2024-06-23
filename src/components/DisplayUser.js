import React from "react";
import { addFollower } from "../utils/addFollower";
const DisplayUser = ({
  displayUser,
  allUsersData,
  loggedInUser,
  usersToBeDisplayed,
}) => {
  if (
    usersToBeDisplayed.length === 1 &&
    displayUser?.userId === loggedInUser?.uid
  ) {
    return (
      <p className="text-center text-sm text-gray-500 font-semibold py-16">
        No other users to display.
      </p>
    );
  }

  if (displayUser?.userId === loggedInUser?.uid) return;

  return (
    <div>
      <div className={`flex items-center mb-4 px-2 py-3 my-2`}>
        <div
          className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[95px] h-[95px] mr-4`}
        >
          <img src={displayUser?.userProfilePicture} className="w-full" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-1">
            <p className="text-lg font-semibold mr-3 text-gray-500">
              {displayUser?.userName}
            </p>
          </div>

          <div className="flex items-center mb-1">
            <p className="text-xs mr-3 text-gray-500">
              Following: {displayUser?.following?.length}
            </p>
          </div>
        </div>

        <button
          className={`text-xs w-[100px] mr-3 font-semibold ${
            displayUser?.followers.includes(loggedInUser?.uid)
              ? "text-gray-500 bg-gray-200 rounded hover:bg-gray-400 "
              : "text-white bg-[#FF748D] rounded hover:bg-[#ee5d78]"
          } px-3 py-2 `}
          onClick={(e) => {
            addFollower(e, displayUser?.userId, allUsersData, loggedInUser);
          }}
        >
          {displayUser?.followers.includes(loggedInUser?.uid)
            ? "unfollow"
            : "Follow"}
        </button>
      </div>
      <hr />
    </div>
  );
};

export default DisplayUser;
