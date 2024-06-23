import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Feed from "../components/Feed";
import Users from "../components/Users";
import Profile from "../components/Profile";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/:userName",
        element: <Profile />,
      },
      { path: "/:userName/:view", element: <Profile /> },
      ,
    ],
  },
]);
