import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../utils/dataContext";
import { fetchDisplayDetails } from "../utils/fetchDisplayDetails";
import Users from "./Users";
import Posts from "./Posts";

const Profile = () => {
  const [display, setDisplay] = useState("post");
  const { loggedInUser, allUsersData, posts } = useContext(dataContext);
  const navigate = useNavigate();

  const currUserData = allUsersData?.find(
    (eachUser) => eachUser?.userId === loggedInUser?.uid
  );

  const displayDetails = fetchDisplayDetails(posts, currUserData, loggedInUser);

  return (
    <div>
      <div className="flex items-center mb-4 px-2 py-3 my-2">
        <div
          className={`flex justify-center text-white text-sm font-semibold items-center rounded-full min-w-[30px] w-[125px] h-[125px] mr-4`}
        >
          <img src={currUserData?.userProfilePicture} className="w-full" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-semibold mr-3 text-gray-500">
              {currUserData?.userName}
            </p>
          </div>

          <div className="flex items-center mb-1">
            {displayDetails.map((eachItem) => {
              return (
                <p className="text-sm mr-3 text-gray-500">
                  {`${eachItem?.innerText}: ${eachItem?.nos}`}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <hr />

      <div className="w-full flex justify-center items-center">
        {displayDetails.map((eachItem) => {
          return (
            <div
              className={`w-[140px] sm:w-[175px] flex gap-2 justify-center items-center text-sm font-semibold ${
                display === eachItem?.display
                  ? "bg-[#FF748D] text-white"
                  : "text-gray-500 hover:bg-gray-200"
              } cursor-pointer py-2`}
              onClick={() => {
                setDisplay(eachItem?.display);
                navigate(`/${loggedInUser?.displayName}/${eachItem?.display}`);
              }}
            >
              {eachItem?.icon}
              <p>{eachItem?.innerText}</p>
            </div>
          );
        })}
      </div>

      {display === "post" && (
        <Posts loggedInUser={loggedInUser} posts={posts} />
      )}
      {(display === "followers" || display === "following") && <Users />}
    </div>
  );
};

export default Profile;
