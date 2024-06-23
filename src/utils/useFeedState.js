import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { dataContext } from "./dataContext";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
const useFeedState = () => {
  const [displayUserInput, setDisplayUserInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const { loggedInUser, posts } = useContext(dataContext);
  const addPostRef = useRef(null);
  const userInputRef = useRef(null);

  const createPost = async (e) => {
    e.stopPropagation();
    if (!userInputRef?.current?.value.trim()) {
      setShowError(true);
      return;
    }

    let newPost = {
      userId: loggedInUser.uid,
      name: loggedInUser.displayName,
      photoURL: loggedInUser.photoURL,
      content: userInputRef?.current?.value,
      timestamp: new Date(),
    };

    const postsCollectionRef = collection(db, "posts");
    await addDoc(postsCollectionRef, newPost);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation();
      if (!addPostRef?.current?.contains(e.target)) {
        setDisplayUserInput(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.addEventListener("click", handleOutsideClick);
  }, []);

  return {
    displayUserInput,
    setDisplayUserInput,
    addPostRef,
    userInputRef,
    showError,
    setShowError,
    createPost,
    posts,
  };
};

export default useFeedState;
