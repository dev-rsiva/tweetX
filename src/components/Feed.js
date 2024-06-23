import React, { useEffect } from "react";
import Posts from "./Posts";
import useFeedState from "../utils/useFeedState";
const Feed = () => {
  const {
    displayUserInput,
    setDisplayUserInput,
    addPostRef,
    userInputRef,
    showError,
    setShowError,
    createPost,
    posts,
  } = useFeedState();

  useEffect(() => {
    displayUserInput && userInputRef?.current?.focus();
  }, [displayUserInput]);

  return (
    <div>
      <div>
        {/* Display "create post" button */}
        {!displayUserInput && (
          <div
            className="shadow rounded-full py-3 w-full text-center text-[#FF748D] bg-[#f7f7f7] text-sm  font-semibold cursor-pointer hover:bg-[#f3f3f3]"
            onClick={(e) => {
              e.stopPropagation();
              setDisplayUserInput(true);
            }}
          >
            <p>Create Post</p>
          </div>
        )}
        {/* Display "user input" for creating post */}
        {displayUserInput && (
          <div ref={addPostRef} className="flex flex-col">
            <textarea
              ref={userInputRef}
              className="shadow rounded px-4 py-2 mb-1 border border-[#FF748D] text-sm text-slate-700 outline-none"
              row={4}
              onFocus={() => setShowError(false)}
            />
            {/* Display error message */}
            {showError && (
              <p className="text-xs text-red-500">
                Input text cannot be empty!
              </p>
            )}

            <div className="flex gap-2 py-2">
              <button
                className="w-[60px] bg-[#FF748D] rounded text-sm text-white px-2 py-1 font-semibold"
                onClick={(e) => {
                  createPost(e);
                  setDisplayUserInput(false);
                }}
              >
                Post
              </button>
              <button
                className="w-[60px] bg-[#FF748D] rounded text-sm text-white px-2 py-1 font-semibold"
                onClick={() => {
                  setDisplayUserInput(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Display all posts */}
      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
