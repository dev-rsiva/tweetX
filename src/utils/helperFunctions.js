export const convertToDate = (timestamp) => {
  if (timestamp && timestamp.seconds !== undefined) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  return null;
};

export const formatTimeDifference = (commentTimestamp) => {
  // Extract seconds and nanoseconds
  const { seconds, nanoseconds } = commentTimestamp;

  // Convert to milliseconds
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
  const commentDate = new Date(milliseconds);

  const now = new Date();

  const timeDifference = now - commentDate;

  // Check if the time difference is negative
  if (timeDifference < 0) {
    console.error("Comment time detected as future time:", commentDate);
    return "Invalid time";
  }

  const secondsDiff = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(secondsDiff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
};
