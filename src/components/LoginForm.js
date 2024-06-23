import { useRef } from "react";
import { handleSignInClick } from "../utils/authHelpers";
const LoginForm = ({
  isSignInForm,
  errorMessage,
  setErrorMessage,
  setLoggedInUser,
  setIsUserAuthenticated,
  navigate,
}) => {
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  return (
    <div className="max-w-[350px] absolute left-4 sm:left-12 top-[25%] shadow-spread rounded-sm p-6 ">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="text-xl text-gray-500 font-bold pl-1 py-2">
          {isSignInForm ? "Login" : "Create Account"}
        </h1>

        {/* Name field */}
        {!isSignInForm && (
          <div className="my-3">
            <input
              ref={name}
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none bg-gray-100 rounded-md text-sm border-slate-00 focus:border-blue-600"
              placeholder="Full name"
            />
            <p className="text-xs text-gray-500 font-semibold pl-[2px]">
              At least 5 characters long.
            </p>
          </div>
        )}

        {/* Email field */}
        <div className="my-3">
          <input
            ref={email}
            type="text"
            className="w-full px-4 py-2 my-1 focus:outline-none  bg-gray-100 rounded-md text-sm border-slate-00 focus:border-blue-600"
            placeholder="Email Address"
          />
          <p className="text-xs text-gray-500 font-semibold pl-[2px]">
            Eg. example@example.com
          </p>
        </div>

        {/* Password field */}
        <div className="my-3">
          <input
            ref={password}
            type="text"
            className="w-full px-4 py-2 my-1 focus:outline-none  bg-gray-100 rounded-md text-sm focus:border-blue-600"
            placeholder="Password"
          />
          <p className="text-xs text-gray-500 font-semibold pl-[2px]">
            At least 8 characters, one uppercase letter, one lowercase letter,
            one special character and one number.
          </p>
        </div>

        {/* Submit button*/}
        <div className="my-3">
          <button
            className="w-full bg-[#FF748D] text-sm text-white px-4 py-2 font-medium my-1 rounded"
            onClick={() => {
              //handle submit button click
              handleSignInClick(
                email,
                password,
                name,
                isSignInForm,
                setErrorMessage,
                setLoggedInUser,
                setIsUserAuthenticated,
                navigate
              );
            }}
          >
            {isSignInForm ? "Login" : "Sign Up"}
          </button>
        </div>
        <p className="text-red-500">{errorMessage}</p>
      </form>
    </div>
  );
};

export default LoginForm;
