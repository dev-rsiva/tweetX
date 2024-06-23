export const processUsers = (allUsersData, loggedInUser, paramObj) => {
  const followers = allUsersData?.find((eachUser) => {
    return eachUser.userId === loggedInUser.uid;
  }).followers;

  const following = allUsersData?.find((eachUser) => {
    return eachUser.userId === loggedInUser.uid;
  }).following;

  const processedUsers =
    paramObj?.view === "followers"
      ? allUsersData.filter((eachUser) => {
          return followers?.includes(eachUser.userId);
        })
      : paramObj?.view === "following"
      ? allUsersData.filter((eachUser) => {
          return following?.includes(eachUser.userId);
        })
      : allUsersData;

  return processedUsers;
};
