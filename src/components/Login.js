import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../utils/Connected world-pana.png";
import LoginForm from "./LoginForm";

const Login = ({
  isSignInForm,
  setIsUserAuthenticated,
  setLoggedInUser,
  setIsSignInForm,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div className="relative">
      <div className="h-[100vh]">
        <div>
          <img
            className="w-[700px] absolute right-10 bottom-0 hidden md:block mr-12"
            src={bg}
          />
        </div>
      </div>

      <div className="absolute h-12 left-4 sm:left-12 top-2 z-30 text-black font-bold text-2xl flex justify-start bg-gradient-to-b from-white to-transparent items-center w-auto px-6 py-10">
        <div>
          <p className="font-sans cursor-pointer text-xl font-semibold text-[#FF748D]">
            TweetX
          </p>
          <button
            className="w-[150px] cursor-pointer text-xs font-bold text-gray-500 pl-[2px] absolute top-20 py-[8px] rounded-lg border border-gray-800 bg-white"
            onClick={() => toggleSignInForm()}
          >
            {isSignInForm ? "Create Account" : "Login"}
          </button>
        </div>
      </div>

      <LoginForm
        isSignInForm={isSignInForm}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setLoggedInUser={setLoggedInUser}
        setIsUserAuthenticated={setIsUserAuthenticated}
        navigate={navigate}
      />
    </div>
  );
};

export default Login;
