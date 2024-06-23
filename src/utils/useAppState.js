import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";

const useAppState = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsersData, setAllUsersData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isSignInForm, setIsSignInForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //Fetch users data from firestore
    const updateUserDataFromFirestore = async () => {
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
        const updatedUsersData = snapshot.docs.map((eachDoc) => {
          return eachDoc.data();
        });
        setAllUsersData(updatedUsersData);
      });

      return () => unsubscribe();
    };

    updateUserDataFromFirestore();

    //Fetch posts from firestore
    const updatePostsDataFromFirestore = async () => {
      const postsCollectionRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsCollectionRef);
      const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
        const updatedPostsData = snapshot.docs.map((eachDoc) => {
          return eachDoc.data();
        });
        setPosts(updatedPostsData);
      });

      return () => unsubscribe();
    };

    updatePostsDataFromFirestore();

    //Authenticate user during user changes and during page refresh
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("outhStateChanged", user);
        setIsUserAuthenticated(true);

        const { uid, email, displayName, photoURL } = user;
        setLoggedInUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: user?.photoURL,
        });
        navigate("/feed");
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    isUserAuthenticated,
    setIsUserAuthenticated,
    loggedInUser,
    setIsSignInForm,
    isSignInForm,
    setLoggedInUser,
    posts,
    allUsersData,
  };
};

export default useAppState;
