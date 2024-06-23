import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
export const addFollower = async (
  e,
  userToFollowId,
  allUsersData,
  loggedInUser
) => {
  e.stopPropagation();

  const updatedAllUsersData = allUsersData
    ? allUsersData?.map((eachUser) => {
        //Update LoggedIn User's Following List
        if (eachUser?.userId === loggedInUser?.uid) {
          return {
            ...eachUser,
            following: eachUser?.following?.includes(userToFollowId)
              ? eachUser?.following?.filter((id) => id !== userToFollowId)
              : [...eachUser?.following, userToFollowId],
          };
        }

        // return all the users other than logggedIn User and Displayed User
        if (eachUser.userId !== userToFollowId) {
          return eachUser;
        }

        //Update Displayed User's Follower List

        return {
          ...eachUser,
          followers: eachUser?.followers?.includes(loggedInUser?.uid)
            ? eachUser?.followers?.filter((id) => {
                return id !== loggedInUser?.uid;
              })
            : [...eachUser?.followers, loggedInUser?.uid],
        };
      })
    : [];

  await Promise.all(
    updatedAllUsersData.map(async (eachUser) => {
      const usersDocRef = doc(db, "users", eachUser?.userId);

      await updateDoc(usersDocRef, {
        followers: eachUser?.followers,
        following: eachUser?.following,
      });
    })
  );
};
