import React from "react";
import { formatTimeDifference } from "../utils/helperFunctions";
const Post = ({ post, paramObj }) => {
  return (
    <div
      className={`relative flex gap-4 justify-start mb-4 px-6 py-3 ${
        paramObj?.view !== "post" &&
        "rounded-md shadow-lg bg-[#FEFEFE] border border-slate-100"
      } my-2`}
    >
      <div
        className={`flex gap-3 text-white text-sm font-semibold rounded-full min-w-[30px] w-[55px] h-[55px]`}
      >
        <img src={post?.photoURL} className="w-full" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full py-4">
          <p className="text-xl font-semibold text-gray-500">{post?.name}</p>
          <p className="text-xs text-gray-500">
            {formatTimeDifference(post.timestamp)}
          </p>
        </div>
        <div className="flex mb-1">
          <p className="text-sm text-gray-500">{post?.content}</p>
        </div>
      </div>
      <div className="absolute right-0 top-[50%] w-4 h-8 rounded-l-full bg-[#FF748D]" />
    </div>
  );
};

export default Post;
