import React, { useContext } from "react";
import { dataContext } from "../utils/dataContext";
import { useParams } from "react-router-dom";
import DisplayUser from "./DisplayUser";
import { processUsers } from "../utils/processUsers";

const Users = () => {
  const { loggedInUser, allUsersData } = useContext(dataContext);
  const paramObj = useParams();
  const usersToBeDisplayed = processUsers(allUsersData, loggedInUser, paramObj);

  if (usersToBeDisplayed.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 font-semibold py-16">
        {paramObj?.view === "followers"
          ? "You have no followers."
          : "You have no following."}{" "}
      </p>
    );
  }

  return (
    <div>
      {usersToBeDisplayed?.map((eachUser) => {
        return (
          <div className="mb-6" key={eachUser?.userId}>
            <DisplayUser
              usersToBeDisplayed={usersToBeDisplayed}
              displayUser={eachUser}
              allUsersData={allUsersData}
              loggedInUser={loggedInUser}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Users;
