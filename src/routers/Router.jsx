import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Registration from "../pages/Registration/Registration";
import Hotels from "../pages/Hotels/Hotels";

export const router = createBrowserRouter([
     {
          path: "/",
          element: <Main />,
          children: [
               {
                    path: "/",
                    element: <Home />
               },
               {
                    path: "signin",
                    element: <SignIn />
               },
               {
                    path: "signup",
                    element: <Registration />
               },
               {
                    path: "hotels",
                    element: <Hotels />
               }
          ]
     }
])