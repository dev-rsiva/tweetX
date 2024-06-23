import { checkValidData } from "./validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { randomAvatar } from "../utils/avatarGenerator";
import { doc, collection, setDoc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export const handleSignInClick = (
  email,
  password,
  name,
  isSignInForm,
  setErrorMessage,
  setLoggedInUser,
  setIsUserAuthenticated,
  navigate
) => {
  const message = checkValidData(
    email.current.value,
    password.current.value,
    name.current?.value,
    isSignInForm
  );
  setErrorMessage(message);

  if (message) return;

  if (!isSignInForm) {
    // Sign up logic
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(async (userCredential) => {
        const user = userCredential.user;

        const obj = {
          displayName: name.current.value,
          photoURL: randomAvatar,
        };
        await updateProfile(user, obj);

        const userInfo = auth.currentUser;

        setLoggedInUser({
          uid: userInfo.uid,
          email: userInfo.email,
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
        });
        //Initialize new data for new user
        await initializeData(userInfo, setIsUserAuthenticated, navigate);
      })
      .catch((error) => {
        console.error("Error during sign-up:", error);
        setErrorMessage(`${error.code} - ${error.message}`);
      });
  } else {
    // Sign in logic
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(async (userCredential) => {
        const user = userCredential.user;

        setLoggedInUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });

        setIsUserAuthenticated(true);
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setErrorMessage(`${error.code} - ${error.message}`);
      });
  }
};

const initializeData = async (user, setIsUserAuthenticated, navigate) => {
  try {
    const usersDocRef = doc(db, "users", user.uid);

    const newUserData = {
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      userProfilePicture: user?.photoURL,
      following: [],
      followers: [],
    };

    await setDoc(usersDocRef, newUserData);

    setIsUserAuthenticated(true);
    navigate("/feed");
  } catch (error) {
    console.error("Error updating users data in Firestore:", error);
  }
};
