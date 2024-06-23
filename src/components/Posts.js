import React from "react";
import Post from "./Post";
import { useParams } from "react-router-dom";
import { processPosts } from "../utils/processPosts";

const Posts = ({ posts, loggedInUser }) => {
  const paramObj = useParams();
  const postsToBeDisplayed = processPosts(posts, loggedInUser, paramObj);

  if (postsToBeDisplayed.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 font-semibold py-16">
        You have no posts.
      </p>
    );
  }

  return (
    <div className="mt-8">
      {postsToBeDisplayed.map((eachPost) => {
        return <Post post={eachPost} paramObj={paramObj} />;
      })}
    </div>
  );
};

export default Posts;
