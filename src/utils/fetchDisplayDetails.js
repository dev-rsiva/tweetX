import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faUserGroup,
  faPersonWalkingArrowRight,
} from "@fortawesome/free-solid-svg-icons";
export const fetchDisplayDetails = (posts, currUserData, loggedInUser) => {
  const details = [
    {
      innerText: "Post",
      display: "post",
      icon: <FontAwesomeIcon icon={faMessage} className="text-xs" />,
      nos: posts.filter((eachPost) => eachPost?.userId === loggedInUser?.uid)
        .length,
    },
    {
      innerText: "Followers",
      display: "followers",
      icon: <FontAwesomeIcon icon={faUserGroup} className="text-xs" />,
      nos: currUserData?.followers.length,
    },
    {
      innerText: "Following",
      display: "following",
      icon: (
        <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="text-xs" />
      ),
      nos: currUserData?.following.length,
    },
  ];

  return details;
};
