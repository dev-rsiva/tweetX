import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import { dataContext } from "./utils/dataContext";
import useAppState from "./utils/useAppState";

const App = () => {
  const {
    isUserAuthenticated,
    setIsUserAuthenticated,
    loggedInUser,
    setIsSignInForm,
    isSignInForm,
    setLoggedInUser,
    posts,
    allUsersData,
  } = useAppState();

  if (!isUserAuthenticated)
    return (
      <div>
        <Login
          setIsUserAuthenticated={setIsUserAuthenticated}
          loggedInUser={loggedInUser}
          setIsSignInForm={setIsSignInForm}
          isSignInForm={isSignInForm}
          setLoggedInUser={setLoggedInUser}
        />
      </div>
    );

  return (
    <dataContext.Provider value={{ loggedInUser, posts, allUsersData }}>
      <div>
        <Header
          loggedInUser={loggedInUser}
          setIsUserAuthenticated={setIsUserAuthenticated}
        />
        <div className="w-[80%] sm:w-[40%] mx-auto py-8">
          <Outlet />
        </div>
      </div>
    </dataContext.Provider>
  );
};

export default App;
