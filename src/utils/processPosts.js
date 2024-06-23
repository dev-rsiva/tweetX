import { convertToDate } from "./helperFunctions";

export const processPosts = (posts, loggedInUser, paramObj) => {
  const userPosts = posts?.filter(
    (eachPost) => eachPost?.userId === loggedInUser?.uid
  );

  const postsToBeSorted = paramObj?.view === "post" ? userPosts : posts;

  // Sorting the posts by timestamp in ascending order
  const processedPosts = [...postsToBeSorted].sort((a, b) => {
    // Function to convert Firestore timestamp to JavaScript Date
    const dateA = convertToDate(a.timestamp);
    const dateB = convertToDate(b.timestamp);

    if (!dateA || !dateB) {
      console.error("Invalid timestamp found:", a.timestamp, b.timestamp);
      return 0; // If any date is invalid, consider them equal for sorting purposes
    }

    return dateB - dateA;
  });

  return processedPosts;
};
